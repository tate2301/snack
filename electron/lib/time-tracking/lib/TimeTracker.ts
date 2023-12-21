import { BrowserWindow } from 'electron';
import SessionTimer from './SessionTimer';
import TimerService from './TimerService';
import TimerIPCListeners from './IPCListeners';
import IdleTimeMonitor from './IdleTimeMonitor';

export default class TimeTracker {
	sessionTimer: SessionTimer;
	private mainWindow: BrowserWindow | null;

	constructor(
		mainWindow: BrowserWindow,
		private timerService: TimerService,
		public ipcListeners: TimerIPCListeners | null,
		private idleTimeMonitor: IdleTimeMonitor,
		sessionTimer: SessionTimer,
	) {
		this.mainWindow = mainWindow;

		this.sessionTimer = sessionTimer;

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

	private getIdleTime(): number {
		if (
			this.timerService.totalTrackedTime <
			this.idleTimeMonitor.getTotalIdleTime()
		) {
			return 0;
		}

		return this.idleTimeMonitor.getTotalIdleTime();
	}

	getTotalWorkingTimeInSession(): number {
		const totalTime = this.timerService.totalTrackedTime - this.getIdleTime();
		console.log({ totalTime });
		return totalTime < 0 ? 0 : totalTime;
	}

	getTotalTrackedToday(): number {
		const totalTime =
			this.timerService.totalTrackedToday -
			this.idleTimeMonitor.getTotalIdleTime();
		console.log({ today: totalTime });
		return totalTime < 0 ? 0 : totalTime;
	}
}
