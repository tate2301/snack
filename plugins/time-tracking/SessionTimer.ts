import { Dispatch } from 'react';
import { generateUUID } from '../../src/lib/functions';
import { ipcRenderer } from 'electron';
import { TimeServiceActionEnum } from './hooks/useTimeService';

export default class SessionTimerActions {
	private isRunning: boolean = false;
	private sessionId: string;
	private send: Dispatch<string>;

	constructor(send: Dispatch<string>) {
		this.send = send;
	}

	start() {
		this.isRunning = true;
		ipcRenderer.send('start-session');
		this.send(TimeServiceActionEnum.START);
	}

	stop() {
		this.isRunning = false;
		ipcRenderer.send(`stop-session`);
		this.send(TimeServiceActionEnum.STOP);
	}

	break() {
		this.isRunning = false;
		ipcRenderer.send(`pause-session`);
		this.send(TimeServiceActionEnum.PAUSE);
	}

	continue() {
		this.isRunning = true;
		ipcRenderer.send(`resume-session`);
		this.send(TimeServiceActionEnum.CONTINUE);
	}

	reset() {
		ipcRenderer.send(`reset-session`);
		this.send(TimeServiceActionEnum.STOP);
	}

	async getTicker(): Promise<number> {
		return ipcRenderer.invoke('request-ticker');
	}

	async getTodayTotal(): Promise<number> {
		return ipcRenderer.invoke('request-ticker');
	}

	async running() {
		return await ipcRenderer.invoke('request-is-tracking');
	}

	id(): string {
		return this.sessionId;
	}
}
