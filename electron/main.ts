import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import installExtension, {
	REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import CustomMenu from './lib/Menu';
import initTimeTracker from './lib/time-tracking/Timer';

const windowStateKeeper = require('electron-window-state');

require('@electron/remote/main').initialize();

function createWindow() {
	const mainWindowState = windowStateKeeper({
		defaultWidth: 1000,
		defaultHeight: 800,
	});
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
		icon: './logo512.png',
		show: false,
		title: 'Snack',
	});

	/** Window Events */
	win.once('ready-to-show', () => {
		win.show();
	});

	win.on('focus', () => {
		win.webContents.send('focus');
	});

	win.on('blur', () => {
		win.webContents.send('blur');
	});

	/**End Window Events */

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

	mainWindowState.manage(win);

	let menu = Menu.buildFromTemplate(CustomMenu);
	if (process.platform === 'darwin') {
		menu = Menu.buildFromTemplate([
			{
				label: app.name,
				submenu: [
					{ role: 'about' },
					{ type: 'separator' },
					{ role: 'services' },
					{ type: 'separator' },
					{ role: 'hide' },
					{ role: 'hideOthers' },
					{ role: 'unhide' },
					{ type: 'separator' },
					{ role: 'quit' },
				],
			},
			...CustomMenu,
		]);
	}
	//TODO: update to Menu.setApplicationMenu(menu);

	initTimeTracker(win);
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

	return JSON.parse(fs.readFileSync(snackPath));
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
	return app.getAppPath('appData');
});

require('./lib/index');
