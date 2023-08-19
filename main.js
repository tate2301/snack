const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
	const win = new BrowserWindow({
		width: 1080,
		height: 720,
		titleBarOverlay: {
			color: '#ebebeb',
			symbolColor: '#808080',
		},
		titleBarStyle: 'hidden',
		maximizable: true,
		icon: path.join(__dirname, './public/app-logo.png'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			enableRemoteModule: true,
			nodeIntegration: true,
			// contextIsolation: false,
			// sandbox: false,
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

/**
 * IPC Methods
 */
ipcMain.handle('load-config', () => {
	// Load snack.json, if not exists create one
	const fs = require('fs');
	const path = require('path');

	const snackPath = path.join(__dirname, './snack.json');
	const snackTemplate = {
		theme: 'light',
		themeColor: '#ffffff',
		themeAccent: '#000000',
		onboarded: false,
		databasePath: '/store.db',
		version: '0.1.0',
	};

	if (!fs.existsSync(snackPath)) {
		fs.writeFileSync(snackPath, JSON.stringify(snackTemplate));
	}

	let snackConfig = JSON.parse(fs.readFileSync(snackPath));
	return snackConfig;
});

ipcMain.handle('save-config', (event, data) => {
	// Load snack.json, if not exists create one
	const fs = require('fs');
	const path = require('path');

	const snackPath = path.join(__dirname, './snack.json');

	fs.writeFileSync(snackPath, JSON.stringify(data));
});

require('./electron-src');
require('./electron-src/utils');
