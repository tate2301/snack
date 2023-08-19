const { app, ipcMain } = require('electron');

ipcMain.handle('app-data', () => {
	const appDataDir = app.getAppPath('appData');
	return appDataDir;
});
