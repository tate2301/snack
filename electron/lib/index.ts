import { ipcMain } from 'electron';

ipcMain.handle('load-database', async (event, pathname) => {
	// Load state.json, if not exists create one
	const fs = require('fs');
	const path = require('path');

	const snackPath = pathname ?? path.join(__dirname, 'snack-state.db');
	const snackTemplate = {
		calendars: {
			color: 'red',
			id: 'New Calendar',
			title: 'Default Calendar',
			createdAt: new Date(),
			events: [],
			tasks: [],
			lastUpdated: new Date(),
			emoji: '📖',
		},
		lists: {
			items: [],
		},
		events: {
			items: [],
		},
		reminders: {},
		user: {},
		settings: {},
		tasks: {
			items: [],
		},
	};

	if (!fs.existsSync(snackPath)) {
		fs.writeFileSync(snackPath, JSON.stringify(snackTemplate));
	}

	return JSON.parse(fs.readFileSync(snackPath));
});

/** Database has .getInstace() which returns a NeDB instance, lets implement IPC for the database */
ipcMain.handle('save-database', async (event, pathname, data) => {
	// Load state.json, if not exists create one
	const fs = require('fs');
	const path = require('path');

	const snackPath = pathname;

	fs.writeFileSync(snackPath, JSON.stringify(data));
});
