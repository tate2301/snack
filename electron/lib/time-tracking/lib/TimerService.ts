import { isEqual, startOfDay, startOfToday } from 'date-fns';
import { MS_PER_SECOND } from '..';

export default class TimerService {
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

		if (this.timer) clearInterval(this.timer);

		this.timer = setInterval(() => {
			if (this.isStopped) return;
			if (!this.isPaused) {
				this.totalTrackedTime += MS_PER_SECOND; // Increment total tracked time by 1 second

				// check if we are not in a new day, if we are, reset total time tracked today.
				if (isEqual(startOfDay(this.trackingStartTime!), startOfToday())) {
					this.totalTrackedToday += MS_PER_SECOND;
				} else {
					this.totalTrackedToday = MS_PER_SECOND;
					this.startOfToday = startOfToday();
					this.breakStartTime = new Date();
				}
			}
		}, MS_PER_SECOND);
	}

	pause() {
		this.isPaused = true;
		this.breakStartTime = new Date();
	}

	resume() {
		this.isPaused = false;
		this.breakStartTime = undefined;
	}

	resetEverything() {
		this.stop();
		this.totalTrackedTime = 0;
		this.totalTrackedToday = 0;
		this.startOfToday = startOfToday();
	}

	reset() {
		this.stop();
		// TODO: to be implemented
	}

	stop() {
		// remove the timer interval.
		if (this.timer) clearInterval(this.timer);

		this.isStopped = true;
		this.isPaused = false;
		this.totalTrackedTime = 0;
	}

	resetAndStartTimer() {
		this.stop();
		this.start();
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
