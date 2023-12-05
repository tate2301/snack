// TimeTracker.js

import { BrowserWindow, ipcMain } from 'electron';
import { TimeEventLogger } from './event-logger';

type TimeTrackerEvent = 'ticker' | 'action';

export interface TimeTrackerObserver {
	update(event: string, data?: any): void;
}

class TimeTracker extends TimeEventLogger {
	timer: NodeJS.Timer | null;
	isPaused: boolean;
	idleTimeThreshold: number;
	idleTimer: NodeJS.Timer | null;
	totalIdleTime: number;
	totalTrackedTime: number; // Total tracked time in milliseconds
	idleStartTime?: Date;
	trackingStartTime?: Date;
	breakStartTime?: Date;

	private observers: TimeTrackerObserver[];
	private mainWindow: BrowserWindow | null;

	constructor(mainWindow: BrowserWindow) {
		super();

		this.timer = null;
		this.isPaused = false;
		this.observers = [];
		this.idleTimeThreshold = 30 * 60 * 1000; // 30 minutes in milliseconds
		this.idleTimer = null;
		this.totalIdleTime = 0; // Total idle time in milliseconds
		this.totalTrackedTime = 0;

		this.mainWindow = mainWindow;

		this.registerIPCListeners();

		// Start monitoring machine lock and idle events
		this.startMonitoringIdleTime();
	}

	registerIPCListeners(): void {
		// Register IPC listener in the main process to receive messages from the renderer process
		ipcMain.on('request-total-tracked-time', (event) => {
			event.returnValue = this.getTotalTrackedTime();
		});

		ipcMain.on('start-tracking', () => {
			if (!this.isPaused && this.totalTrackedTime !== 0) return;
			this.startTracking();
		});

		ipcMain.on('pause-tracking', () => {
			this.pauseTracking();
		});

		ipcMain.on('resume-tracking', () => {
			this.resumeTracking();
		});

		ipcMain.on('start-break', () => {
			this.startBreak();
		});

		ipcMain.on('end-break', () => {
			this.endBreak();
		});

		// read state from the class
		ipcMain.on('request-log', (event) => {
			event.returnValue = this.getEvents();
			console.log(this.getEvents());
		});

		ipcMain.on('request-total-tracked-time', (event) => {
			event.returnValue = this.getTotalTrackedTime();
		});

		ipcMain.on('request-is-tracking', (event) => {
			event.returnValue = !this.isPaused && this.totalTrackedTime !== 0;
		});

		ipcMain.on('request-is-paused', (event) => {
			event.returnValue = this.isPaused;
		});

		ipcMain.on('request-is-on-break', (event) => {
			event.returnValue = this.isPaused && this.totalTrackedTime !== 0;
		});
	}

	startTracking() {
		this.notifyObservers('action', 'start');
		this.trackingStartTime = new Date();

		this.timer = setInterval(() => {
			if (!this.isPaused) {
				// Simulate time tracking by logging the current time
				console.log(new Date());
				this.totalTrackedTime += 1000; // Increment total tracked time by 1 second
				this.notifyObservers('ticker', this.totalTrackedTime);
			}
		}, 1000);
	}

	pauseTracking() {
		if (this.isPaused) return;

		this.isPaused = true;
		this.notifyObservers('action', 'pause');

		if (this.trackingStartTime) {
			this.logTrackedTime(
				this.trackingStartTime.getTime(),
				new Date().getTime(),
			);
		}
	}

	resumeTracking() {
		this.isPaused = false;
		this.notifyObservers('action', 'resume');
	}

	startBreak() {
		this.pauseTracking();
		this.notifyObservers('action', 'start-break');

		// Additional break logic can be added here
	}

	endBreak() {
		this.resumeTracking();
		this.notifyObservers('action', 'end-break');

		if (this.breakStartTime) {
			this.logBreak(
				this.breakStartTime.getTime(),
				new Date().getTime(),
				'USER_INITIATED',
			);
		}
	}

	startMonitoringIdleTime() {
		const { powerMonitor } = require('electron');
		powerMonitor.on('lock-screen', () => {
			this.pauseTracking();
		});

		powerMonitor.on('unlock-screen', () => {
			this.resumeTracking();
		});

		powerMonitor.on('suspend', () => {
			this.idleStartTime = new Date();
			this.startIdleTimer();
		});

		powerMonitor.on('suspend', () => {
			this.idleStartTime = new Date();
			this.startIdleTimer();
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

	startIdleTimer() {
		this.idleStartTime = new Date();
		this.idleTimer = setTimeout(() => {
			this.pauseTracking();
		}, this.idleTimeThreshold);

		this.notifyObservers('action', 'start-idle');
	}

	stopIdleTimer() {
		if (this.idleTimer) clearTimeout(this.idleTimer);
		this.notifyObservers('action', 'stop-idle');
		if (this.idleStartTime) {
			this.logTrackedTime(this.idleStartTime.getTime(), new Date().getTime());
		}
	}

	getTotalIdleTime() {
		return this.totalIdleTime;
	}

	getTotalTrackedTime(): number {
		return this.totalTrackedTime;
	}

	getTotalWorkingTime(): number {
		return this.getTotalTrackedTime() - this.getTotalIdleTime();
	}

	addObserver(observer: any) {
		this.observers.push(observer);
	}

	removeObserver(observer: any) {
		this.observers = this.observers.filter((obs) => obs !== observer);
	}

	notifyObservers(event: TimeTrackerEvent, data?: any): void {
		this.observers.forEach((observer) => {
			observer.update(event, data);
		});

		// Send to renderer process
		if (this.mainWindow) {
			this.mainWindow.webContents.send('time-tracker-event', { event, data });
		}
	}
}

// Singleton instance
let instance: TimeTracker;

function timeTrackerInstance(mainWindow: BrowserWindow) {
	if (!instance) {
		instance = new TimeTracker(mainWindow);
	}
	return instance;
}

export default timeTrackerInstance;
