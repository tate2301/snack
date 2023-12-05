import { generateUUID } from '../../lib/functions';
import { ipcRenderer } from 'electron';

export default class ClientTimer {
	private isRunning: boolean = false;
	private sessionId: string;

	start() {
		this.isRunning = true;
		ipcRenderer.send('start-tracking');
	}

	stop() {
		this.isRunning = false;
		ipcRenderer.send(`stop-tracking`);
	}

	break() {
		this.isRunning = false;
		ipcRenderer.send(`start-break`);
	}

	continue() {
		this.isRunning = false;
		ipcRenderer.send(`end-break`);
	}

	getTime() {
		return ipcRenderer.send('request-log');
	}

	running() {
		return this.isRunning;
	}

	id(): string {
		return this.sessionId;
	}
}
