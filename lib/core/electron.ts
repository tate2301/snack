type ElectronAPI = {
	require: (module: string) => any;
};

const electronAPI: ElectronAPI | undefined =
	typeof window !== 'undefined'
		? (window as typeof window & { electronAPI: ElectronAPI }).electronAPI
		: undefined;

export default electronAPI;
