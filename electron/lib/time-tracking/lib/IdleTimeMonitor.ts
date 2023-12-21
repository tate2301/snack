import { IDLE_TIME_THRESHOLD } from '..';

export default class IdleTimeMonitor {
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
