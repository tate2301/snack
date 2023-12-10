import { BrowserWindow, Menu, Tray } from 'electron';
const path = require('path');

class TrayGenerator {
	private tray: Electron.CrossProcessExports.Tray | null;
	private mainWindow: any;
	constructor({ mainWindow }: { mainWindow: any }) {
		this.tray = null;
		this.mainWindow = mainWindow;
	}
	getWindowPosition = () => {
		if (!this.tray) return;
		const windowBounds = this.mainWindow.getBounds();
		const trayBounds = this.tray.getBounds();
		const x = Math.round(
			trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2,
		);
		const y = Math.round(trayBounds.y + trayBounds.height);
		return { x, y };
	};
	showWindow = () => {
		const position = this.getWindowPosition();
		if (!position) return;
		this.mainWindow.setPosition(position.x, position.y, false);
		this.mainWindow.show();
		this.mainWindow.setVisibleOnAllWorkspaces(true);
		this.mainWindow.focus();
		this.mainWindow.setVisibleOnAllWorkspaces(false);
	};
	toggleWindow = () => {
		if (this.mainWindow.isVisible()) {
			this.mainWindow.hide();
		} else {
			this.showWindow();
		}
	};
	rightClickMenu = () => {
		if (!this.tray) return;
		const menu = [
			{
				role: 'quit',
				accelerator: 'Command+Q',
			},
		];
		// @ts-ignore
		this.tray.popUpContextMenu(Menu.buildFromTemplate(menu));
	};
	createTray = () => {
		this.tray = new Tray(path.join(__dirname, './assets/IconTemplate.png'));
		this.tray.setIgnoreDoubleClickEvents(true);
		this.tray.on('click', this.toggleWindow);
		this.tray.on('right-click', this.rightClickMenu);
	};
}
