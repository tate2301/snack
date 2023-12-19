import { generateUUID } from '../../lib/functions';
import { ipcRenderer } from 'electron';

export default class ClientTimer {
	private isRunning: boolean = false;
	private sessionId: string;

	start() {
		this.isRunning = true;
		ipcRenderer.send('start-session');
	}

	stop() {
		this.isRunning = false;
		ipcRenderer.send(`stop-session`);
	}

	break() {
		this.isRunning = false;
		ipcRenderer.send(`pause-session`);
	}

	continue() {
		this.isRunning = true;
		ipcRenderer.send(`resume-session`);
	}

	async getTime(): Promise<number> {
		return ipcRenderer.invoke('request-ticker');
	}

	async running() {
		return await ipcRenderer.invoke('request-is-tracking');
	}

	id(): string {
		return this.sessionId;
	}
}
