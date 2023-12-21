import { ipcMain } from 'electron';
import TimeTracker from './TimeTracker';

export default class TimerIPCListeners {
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

		ipcMain.on('reset-session', () => {
			this.timeTracker.sessionTimer.resumeSession();
		});
	}

	registerReadSessionValueHandlers() {
		ipcMain.handle('request-date', (event) => {
			return this.timeTracker.currentDate().toString();
		});

		ipcMain.handle('request-ticker', (event) => {
			if (this.timeTracker.isStopped()) return 0;
			return this.timeTracker.getTotalWorkingTimeInSession();
		});

		ipcMain.handle('request-total-today', (event) => {
			return this.timeTracker.getTotalTrackedToday();
		});

		ipcMain.handle('break-time', (event) => {
			return this.timeTracker.sessionTimer.getBreakTime();
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

	private registerListeners(): void {
		this.registerSessionListeners();
		this.registerReadSessionValueHandlers();
	}
}
