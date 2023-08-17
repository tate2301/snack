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
		titleBarOverlay: {
			color: '#ebebeb',
			symbolColor: '#808080',
		},
		titleBarStyle: 'hidden',
		maximizable: true,
		icon: path.join(__dirname, './public/app-logo.png'),
		webPreferences: {
			// preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			// contextIsolation: false,
			webSecurity: true,
		},
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
	// close the child process
	if (process.platform !== 'darwin') app.quit();
});
