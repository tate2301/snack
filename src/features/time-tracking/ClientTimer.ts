import { generateUUID } from '../../lib/functions';
import { ipcRenderer } from 'electron';

export default class ClientTimer {
	private isRunning: boolean = false;
	private sessionId: string;

	start() {
		this.isRunning = true;
		ipcRenderer.send('start-tracking');
	}

	pause() {
		this.isRunning = false;
		ipcRenderer.send(`pause-tracking`);
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
