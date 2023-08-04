const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
	const win = new BrowserWindow({
		width: 1080,
		height: 720,
		webPreferences: {
			nodeIntegration: true,
		},
		titleBarStyle: 'hidden',
		maximizable: true,
		icon: path.join(__dirname, './public/app-logo.png'),
	});

	win.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../out/index.html')}`,
	);
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});
