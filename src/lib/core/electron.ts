type ElectronAPI = {
	loadConfig: () => Promise<object>;
	saveConfig: (data: object) => Promise<void>;
	loadDatabase: (pathname: string) => Promise<object>;
	saveDatabase: (pathname: string, data: object) => Promise<void>;
	invoke: (event: string) => Promise<any>;
	send: (channel: string, ...args: any[]) => void;
	on: (channel: string, listener: (...args: any[]) => void) => void;
	require: (module: string) => any;
	appData: Promise<string>;
	env: {
		[key: string]: string | undefined;
	};
};

const electronAPI: ElectronAPI | undefined =
	typeof window !== 'undefined'
		? (window as typeof window & { electronAPI: ElectronAPI }).electronAPI
		: undefined;

export default class SnackElectronIPC {
	private readonly ipc: any;

	constructor(ipc: any) {
		this.ipc = ipc;
	}

	on(channel: string, listener: (...args: any[]) => void) {
		this.ipc.on(channel, listener);
	}

	send(channel: string, ...args: any[]) {
		this.ipc.send(channel, ...args);
	}
}

export { electronAPI };
