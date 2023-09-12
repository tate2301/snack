'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var electron_1 = require('electron');
var path = require('path');
var electron_devtools_installer_1 = require('electron-devtools-installer');
function createWindow() {
	var win = new electron_1.BrowserWindow({
		width: 1080,
		height: 720,
		webPreferences: {
			contextIsolation: false,
			// preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
		},
		titleBarOverlay: {
			color: '#ebebeb',
			symbolColor: '#808080',
		},
		titleBarStyle: 'hidden',
		maximizable: true,
	});
	if (electron_1.app.isPackaged) {
		// 'build/index.html'
		win.loadURL('file://'.concat(__dirname, '/index.html'));
	} else {
		win.loadURL('http://localhost:3000/index.html');
		win.webContents.openDevTools();
		// Hot Reloading on 'node_modules/.bin/electronPath'
		require('electron-reload')(__dirname, {
			electron: path.join(
				__dirname,
				'..',
				'..',
				'node_modules',
				'.bin',
				'electron' + (process.platform === 'win32' ? '.cmd' : ''),
			),
			forceHardReset: true,
			hardResetMethod: 'exit',
		});
	}
}
electron_1.app.whenReady().then(function () {
	// DevTools
	(0, electron_devtools_installer_1.default)(
		electron_devtools_installer_1.REACT_DEVELOPER_TOOLS,
	)
		.then(function (name) {
			return console.log('Added Extension:  '.concat(name));
		})
		.catch(function (err) {
			return console.log('An error occurred: ', err);
		});
	createWindow();
	electron_1.app.on('activate', function () {
		if (electron_1.BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
	electron_1.app.on('window-all-closed', function () {
		if (process.platform !== 'darwin') {
			electron_1.app.quit();
		}
	});
});
/**
 * IPC Methods
 */
electron_1.ipcMain.handle('load-config', function () {
	// Load snack.json, if not exists create one
	var fs = require('fs');
	var path = require('path');
	var snackPath = path.join(__dirname, './snack.json');
	var snackTemplate = {
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
	var snackConfig = JSON.parse(fs.readFileSync(snackPath));
	return snackConfig;
});
electron_1.ipcMain.handle('save-config', function (event, data) {
	// Load snack.json, if not exists create one
	var fs = require('fs');
	var path = require('path');
	var snackPath = path.join(__dirname, './snack.json');
	fs.writeFileSync(snackPath, JSON.stringify(data));
});
electron_1.ipcMain.handle('app-data', function () {
	// @ts-ignore
	var appDataDir = electron_1.app.getAppPath('appData');
	return appDataDir;
});
require('./lib/index');
//# sourceMappingURL=main.js.map
