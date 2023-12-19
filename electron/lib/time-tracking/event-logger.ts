import {
	BreakEvent,
	IdleTimeEvent,
	TimeEvent,
	TrackedTimeEvent,
} from './types';

export class TimeEventLogger {
	private events: TimeEvent[] = [];

	logEvent(event: TimeEvent) {
		this.events.push(event);
	}

	logTrackedTime(startTime: number, endTime?: number) {
		const event: TrackedTimeEvent = {
			startTime,
			endTime,
		};
		this.logEvent({ timestamp: Date.now(), type: 'tracked_time', data: event });
	}

	logBreak(startTime: number, endTime: number, reason: string) {
		const event: BreakEvent = {
			startTime: startTime,
			endTime: endTime,
			reason: reason,
		};
		this.logEvent({ timestamp: Date.now(), type: 'break', data: event });
	}

	logIdleTime(startTime: number, endTime: number, duration: number) {
		const event: IdleTimeEvent = {
			startTime: startTime,
			endTime: endTime,
		};
		this.logEvent({ timestamp: Date.now(), type: 'idle_time', data: event });
	}

	getEvents(): TimeEvent[] {
		return this.events;
	}

	clearLogs() {
		this.events = [];
	}
}
