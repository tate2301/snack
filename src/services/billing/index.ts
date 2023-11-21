import { generateUUID } from '../../lib/functions';
import { SnackTask } from '../../redux/tasks/types';

export class BillingService {
	private timers: Map<string, { start: Date; end?: Date; tasks: string[] }[]> =
		new Map();
	private currentTimer: string | null = null;
	private billingRate: {
		amount: number;
		period: 'hour' | 'week' | 'month' | 'year';
	} = { amount: 0, period: 'hour' };

	constructor() {}

	startTimer(sessionId?: string): void {
		if (this.currentTimer) {
			this.stopTimer(this.currentTimer);
		}
		sessionId = sessionId || generateUUID();
		const sessions = this.timers.get(sessionId) || [];
		sessions.push({ start: new Date(), tasks: [] });
		this.timers.set(sessionId, sessions);
		this.currentTimer = sessionId;
	}

	pauseTimer(sessionId: string): void {
		const sessions = this.timers.get(sessionId);
		if (sessions) {
			const currentSession = sessions[sessions.length - 1];
			if (!currentSession.end) {
				currentSession.end = new Date();
			}
		}
		this.currentTimer = null;
	}

	continueTimer(sessionId: string): void {
		this.startTimer(sessionId);
	}

	stopTimer(sessionId: string): void {
		this.pauseTimer(sessionId);
	}

	setBillingRate(
		amount: number,
		period: 'hour' | 'week' | 'month' | 'year',
	): void {
		this.billingRate = { amount, period };
	}

	getBillingRate(): {
		amount: number;
		period: 'hour' | 'week' | 'month' | 'year';
	} {
		return this.billingRate;
	}

	calculateBill(
		sessionId: string,
		hydrateTasks: (taskIds: Array<string>) => Array<SnackTask>,
	): number {
		const sessions = this.timers.get(sessionId);
		if (!sessions) {
			throw new Error(`No sessions found for task ${sessionId}`);
		}

		let totalMilliseconds = 0;
		let totalBill = 0;
		for (const session of sessions) {
			const end = session.end || new Date();
			totalMilliseconds += end.getTime() - session.start.getTime();
			const tasks = hydrateTasks(session.tasks);
			for (const task of tasks) {
				const totalHours = totalMilliseconds / 1000 / 60 / 60;
				switch (task.billingRate.period) {
					case 'hour':
						totalBill += totalHours * task.billingRate.amount;
						break;
					case 'week':
						totalBill += (totalHours / (24 * 7)) * task.billingRate.amount;
						break;
					case 'month':
						totalBill += (totalHours / (24 * 30)) * task.billingRate.amount;
						break;
					case 'year':
						totalBill += (totalHours / (24 * 365)) * task.billingRate.amount;
						break;
				}
			}
		}

		return totalBill;
	}

	addTaskToTimeSession(sessionId: string, task: string): void {
		let sessions = this.timers.get(sessionId);
		if (!sessions) {
			sessions = [{ start: new Date(), tasks: [] }];
			this.timers.set(sessionId, sessions);
		}
		const currentSession = sessions[sessions.length - 1];
		if (!currentSession.end) {
			currentSession.tasks.push(task);
		}
	}

	removeTaskFromTimeSession(sessionId: string, task: string): void {
		const sessions = this.timers.get(sessionId);
		if (sessions) {
			const currentSession = sessions[sessions.length - 1];
			if (!currentSession.end) {
				const taskIndex = currentSession.tasks.indexOf(task);
				if (taskIndex > -1) {
					currentSession.tasks.splice(taskIndex, 1);
				}
			}
		}
	}
}
