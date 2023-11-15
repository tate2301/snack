import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import installExtension, {
	REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

require('@electron/remote/main').initialize();

function createWindow() {
	const win = new BrowserWindow({
		width: 1080,
		height: 720,
		minWidth: 720,
		minHeight: 480,
		webPreferences: {
			contextIsolation: false,
			// preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
		},
		titleBarOverlay: {
			color: '#ebebeb00',
			symbolColor: '#808080',
			height: 40,
		},
		titleBarStyle: 'hidden',
		maximizable: true,
		transparent: true,
		icon: './logo512.png',
	});

	require('@electron/remote/main').enable(win.webContents);

	if (app.isPackaged) {
		// 'build/index.html'
		win.loadURL(`file://${__dirname}/../index.html`);
	} else {
		win.loadURL('http://localhost:3000/index.html');

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

app.whenReady().then(() => {
	// DevTools
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
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

ipcMain.handle('app-data', () => {
	// @ts-ignore
	const appDataDir = app.getAppPath('appData');
	return appDataDir;
});

ipcMain.on('show-emoji-picker', () => {
	if (app.isEmojiPanelSupported()) {
		app.showEmojiPanel();
	}
});

require('./lib/index');
