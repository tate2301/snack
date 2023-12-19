import { TimeEventLogger } from './event-logger';

export default class TaskTimeTracker {
	id: string;
	task: {
		startTime?: Date;
		endTime?: Date;
		breaks: Array<{ start: Date; end?: Date }>;
		idles: Array<{ start: Date; end?: Date }>;
		totalTrackedTime: number;
		stopped?: boolean;
	} = { totalTrackedTime: 0, breaks: [], idles: [] };

	constructor(id: string) {
		this.id = id;
	}

	startTask() {
		if (this.task.startTime) {
			throw new Error(`Task is already started.`);
		}
		this.task.startTime = new Date();
	}

	stopTask() {
		if (!this.task.startTime) {
			throw new Error(`Task is not started.`);
		}
		this.task.endTime = new Date();
		this.task.totalTrackedTime +=
			this.task.endTime.getTime() - this.task.startTime.getTime();
		this.task.stopped = true;
	}

	startTaskBreak() {
		this.task.breaks.push({ start: new Date() });
	}

	stopTaskBreak() {
		const currentBreak = this.task.breaks[this.task.breaks.length - 1];
		if (!currentBreak || currentBreak.end) {
			throw new Error(`Break for task is not started.`);
		}
		currentBreak.end = new Date();
	}

	startTaskIdleTimer() {
		this.task.idles.push({ start: new Date() });
	}

	stopTaskIdleTimer() {
		const currentIdle = this.task.idles[this.task.idles.length - 1];
		if (!currentIdle || currentIdle.end) {
			throw new Error(`Break for task is not started.`);
		}
		currentIdle.end = new Date();
	}

	getTaskTotalTrackedTime(): number {
		const totalBreakTime = this.task.breaks.reduce((total, { start, end }) => {
			return (
				total + ((end ? end.getTime() : new Date().getTime()) - start.getTime())
			);
		}, 0);

		const totalIdleTime = this.task.breaks.reduce((total, { start, end }) => {
			return (
				total + ((end ? end.getTime() : new Date().getTime()) - start.getTime())
			);
		}, 0);
		return this.task.totalTrackedTime - totalBreakTime - totalIdleTime;
	}
}
