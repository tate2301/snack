// TimeTracker.js

import { BrowserWindow, ipcMain } from 'electron';
import { TimeEventLogger } from './event-logger';
import { isEqual, startOfDay, startOfToday } from 'date-fns';
import TaskTimeTracker from './task-tracker';

const MS_PER_SECOND = 1000;
const IDLE_TIME_THRESHOLD = 10 * 60 * MS_PER_SECOND; // 10 minutes

export interface TimeTrackerObserver {
	update<T>(event: string, data?: T): void;
}

class TimerService {
	private timer: NodeJS.Timer | null = null;
	private isPaused: boolean = false;
	private isStopped: boolean = true;
	totalTrackedTime: number = 0; // Total tracked time in milliseconds
	totalTrackedToday: number = 0;
	startOfToday: Date = startOfToday();
	trackingStartTime?: Date;

	breakStartTime?: Date;

	start() {
		this.isStopped = false;
		this.trackingStartTime = new Date();

		this.timer = setInterval(() => {
			if (this.isStopped) return;
			if (!this.isPaused) {
				this.totalTrackedTime += MS_PER_SECOND; // Increment total tracked time by 1 second

				// check if we are not in a new day, if we are, reset total time tracked today.
				if (isEqual(startOfDay(this.trackingStartTime!), startOfToday())) {
					this.totalTrackedToday += this.totalTrackedTime;
				} else {
					this.totalTrackedToday = MS_PER_SECOND;
					this.startOfToday = startOfToday();
				}
			}
		}, MS_PER_SECOND);
	}

	pause() {
		this.isPaused = true;
	}

	resume() {
		this.isPaused = false;
	}

	stop() {
		// remove the timer interval.
		if (this.timer) clearInterval(this.timer);

		this.isStopped = true;
		this.isPaused = false;
		this.totalTrackedTime = 0;
	}

	startIfPausedOrStopped() {
		if (this.isTimerPaused()) {
			this.resume();
			return;
		}
		if (this.isTimerStopped()) {
			this.start();
			return;
		}
	}

	isTimerPaused() {
		return this.isPaused;
	}

	isTimerStopped() {
		return this.isStopped;
	}

	currentDate() {
		return startOfToday;
	}
}

class TimerIPCListeners {
	constructor(private timeTracker: TimeTracker) {
		this.registerListeners();
	}

	private registerSessionListeners() {
		ipcMain.on('start-session', () => {
			if (!this.timeTracker.isStopped) return;
			this.timeTracker.sessionTimer.startSession();
		});

		ipcMain.on('stop-session', () => {
			this.timeTracker.sessionTimer.stopSession();
		});

		ipcMain.on('pause-session', () => {
			this.timeTracker.sessionTimer.pauseSession();
		});

		ipcMain.on('resume-session', () => {
			this.timeTracker.sessionTimer.resumeSession();
		});
	}

	private registerTaskListeners() {
		ipcMain.on('start-task', (event, id) => {
			this.timeTracker.taskTimer.startTask(id);
		});
		ipcMain.on('stop-task', () => {
			this.timeTracker.taskTimer.stopTask();
		});

		ipcMain.on('pause-task', () => {
			this.timeTracker.taskTimer.pauseTask();
		});

		ipcMain.on('resume-task', () => {
			this.timeTracker.taskTimer.resumeTask();
		});
	}

	registerReadSessionValueHandlers() {
		ipcMain.handle('request-date', (event) => {
			return this.timeTracker.currentDate().toString();
		});

		ipcMain.handle('request-ticker', (event) => {
			if (this.timeTracker.isStopped()) return null;
			return this.timeTracker.getTotalWorkingTimeInSession();
		});

		ipcMain.handle('request-total-today', (event) => {
			return this.timeTracker.getTotalTrackedToday();
		});

		ipcMain.handle('request-is-tracking', (event) => {
			return !this.timeTracker.isPaused() && !this.timeTracker.isStopped();
		});

		ipcMain.on('request-is-paused', (event) => {
			event.returnValue = this.timeTracker.isPaused;
		});

		ipcMain.on('request-is-on-break', (event) => {
			event.returnValue =
				this.timeTracker.isPaused() && !this.timeTracker.isStopped();
		});
	}

	registerReadTaskValueHandlers() {
		ipcMain.handle('request-task-total-tracked-time', (event, id) => {
			return this.timeTracker.getTotalWorkingTimeInSession();
		});
	}

	private registerListeners(): void {
		this.registerSessionListeners();
		this.registerTaskListeners();
		this.registerReadSessionValueHandlers();
		this.registerReadTaskValueHandlers();
	}
}

class IdleTimeMonitor {
	private idleStartTime?: Date;
	private idleTimer: NodeJS.Timer | null = null;
	private totalIdleTime: number = 0;

	startIdleTimer(callback: () => void, threshold: number) {
		this.idleStartTime = new Date();
		this.idleTimer = setTimeout(callback, threshold);
	}

	stopIdleTimer() {
		if (this.idleTimer) clearTimeout(this.idleTimer);
		if (this.idleStartTime) {
			this.totalIdleTime += new Date().getTime() - this.idleStartTime.getTime();
			this.idleStartTime = undefined;
		}
	}

	getTotalIdleTime() {
		return this.totalIdleTime;
	}

	startMonitoringIdleTime() {
		const { powerMonitor } = require('electron');
		powerMonitor.on('lock-screen', () => {
			this.startIdleTimer(() => {}, IDLE_TIME_THRESHOLD);
		});

		powerMonitor.on('unlock-screen', () => {
			this.stopIdleTimer();
		});

		powerMonitor.on('suspend', () => {
			this.idleStartTime = new Date();
			this.startIdleTimer(() => {}, IDLE_TIME_THRESHOLD);
		});

		powerMonitor.on('resume', () => {
			if (this.idleStartTime) {
				this.totalIdleTime +=
					new Date().getTime() - this.idleStartTime.getTime();
				this.idleStartTime = undefined;
				this.stopIdleTimer();
			}
		});
	}
}

class TaskTracker {
	private taskController?: TaskTimeTracker;

	startTask(id: string) {
		if (this.taskController) this.taskController = undefined;
		this.taskController = new TaskTimeTracker(id);
		this.taskController.startTask();
	}

	pauseTask() {
		if (this.taskController) this.taskController.startTaskBreak();
	}

	resumeTask() {
		if (this.taskController) this.taskController.stopTaskBreak();
	}

	stopTask() {
		if (this.taskController) {
			this.taskController.stopTask();
			this.taskController = undefined;
		}
	}

	getTotalTaskWorkingTime(): number {
		if (!this.taskController) return 0;
		return this.taskController.getTaskTotalTrackedTime();
	}
}

class SessionTimer {
	constructor(private timerService: TimerService) {}

	startSession() {
		this.timerService.start();
	}

	pauseSession() {
		this.timerService.pause();
	}

	stopSession(): void {
		this.timerService.stop();
	}

	resumeSession() {
		this.timerService.resume();
	}
}

class TaskTimer {
	constructor(
		private taskTracker: TaskTracker,
		private timerService: TimerService,
	) {}

	startTask(id: string) {
		this.timerService.startIfPausedOrStopped();
		this.taskTracker.startTask(id);
	}

	stopTask() {
		this.taskTracker.stopTask();
	}

	pauseTask() {
		this.taskTracker.pauseTask();
	}

	resumeTask() {
		this.taskTracker.resumeTask();
	}

	totalTimeTracked() {
		return this.taskTracker.getTotalTaskWorkingTime();
	}
}

class TimeTracker extends TimeEventLogger {
	sessionTimer: SessionTimer;
	taskTimer: TaskTimer;
	private mainWindow: BrowserWindow | null;

	constructor(
		mainWindow: BrowserWindow,
		private timerService: TimerService,
		public ipcListeners: TimerIPCListeners | null,
		private idleTimeMonitor: IdleTimeMonitor,
		sessionTimer: SessionTimer,
		taskTimer: TaskTimer,
	) {
		super();
		this.mainWindow = mainWindow;

		this.sessionTimer = sessionTimer;
		this.taskTimer = taskTimer;

		this.idleTimeMonitor.startMonitoringIdleTime();
	}

	currentDate() {
		return this.timerService.currentDate();
	}

	isPaused() {
		return this.timerService.isTimerPaused();
	}

	isStopped() {
		return this.timerService.isTimerStopped();
	}

	getTotalWorkingTimeInSession(): number {
		return (
			this.timerService.totalTrackedTime -
			this.idleTimeMonitor.getTotalIdleTime()
		);
	}

	getTotalTaskWorkingTime(): number {
		return this.taskTimer.totalTimeTracked();
	}

	getTotalTrackedToday(): number {
		return (
			this.timerService.totalTrackedToday -
			this.idleTimeMonitor.getTotalIdleTime()
		);
	}
}

// Singleton instance
let instance: TimeTracker;

function timeTrackerInstance(mainWindow: BrowserWindow) {
	const timer = new TimerService();
	const idleTimeMonitor = new IdleTimeMonitor();
	const taskTracker = new TaskTracker();

	const sessionTimer = new SessionTimer(timer);
	const taskTimer = new TaskTimer(taskTracker, timer);

	if (!instance) {
		instance = new TimeTracker(
			mainWindow,
			timer,
			null, // Pass null initially
			idleTimeMonitor,
			sessionTimer,
			taskTimer,
		);

		instance.ipcListeners = new TimerIPCListeners(instance);
	}
	return instance;
}

export default timeTrackerInstance;
