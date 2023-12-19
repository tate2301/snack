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
