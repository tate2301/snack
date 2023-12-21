import TimerService from './TimerService';

export default class SessionTimer {
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

	resetSession() {
		this.timerService.resume();
	}

	getBreakTime() {
		return this.timerService.breakStartTime?.getTime() ?? 0;
	}
}
