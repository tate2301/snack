// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	loadConfig: () => ipcRenderer.invoke('load-config'),
	saveConfig: (data) => ipcRenderer.invoke('save-config', data),
	loadDatabase: (pathname) => ipcRenderer.invoke('load-database', pathname),
	saveDatabase: (data) => ipcRenderer.invoke('save-database', data),
	invoke: (event) => ipcRenderer.invoke(event),
	send: (event, data) => ipcRenderer.send(event, data),
	on: (event, callback) => ipcRenderer.on(event, callback),
	require: (module) => window.require(module),
	path: window.require('path'),
	fs: window.require('fs'),
	appData: ipcRenderer.invoke('app-data'),
});
