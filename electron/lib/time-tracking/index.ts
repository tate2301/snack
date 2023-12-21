// TimeTracker.js

import { BrowserWindow } from 'electron';
import TimeTracker from './lib/TimeTracker';
import TimerService from './lib/TimerService';
import IdleTimeMonitor from './lib/IdleTimeMonitor';
import SessionTimer from './lib/SessionTimer';
import TimerIPCListeners from './lib/IPCListeners';

export const MS_PER_SECOND = 1000;
export const IDLE_TIME_THRESHOLD = 10 * 60 * MS_PER_SECOND; // 10 minutes

export interface TimeTrackerObserver {
	update<T>(event: string, data?: T): void;
}

// Singleton instance
let instance: TimeTracker;

function timeTrackerInstance(mainWindow: BrowserWindow) {
	const timer = new TimerService();
	const idleTimeMonitor = new IdleTimeMonitor();
	const sessionTimer = new SessionTimer(timer);

	if (!instance) {
		instance = new TimeTracker(
			mainWindow,
			timer,
			null, // Pass null initially
			idleTimeMonitor,
			sessionTimer,
		);

		instance.ipcListeners = new TimerIPCListeners(instance);
	}
	return instance;
}

export default timeTrackerInstance;
