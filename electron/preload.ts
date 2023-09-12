// Preload (Isolated World)
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
	loadConfig: () => ipcRenderer.invoke('load-config'),
	saveConfig: (data: any) => ipcRenderer.invoke('save-config', data),
	loadDatabase: (pathname: string) =>
		ipcRenderer.invoke('load-database', pathname),
	saveDatabase: (data: any) => ipcRenderer.invoke('save-database', data),
	invoke: (event: any) => ipcRenderer.invoke(event),
	send: (event: string, data: any) => ipcRenderer.send(event, data),
	on: (event: string, callback: any) => ipcRenderer.on(event, callback),
	require: (module: string) => window.require(module),
	path: window.require('path'),
	fs: window.require('fs'),
	appData: ipcRenderer.invoke('app-data'),
	env: {
		...process.env,
	},
});
