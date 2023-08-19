import { electronAPI } from './electron';
const { deepParseJson } = require('deep-parse-json');

const createSnackStorage = async (pre?: {
	store?: Nedb;
	storeOptions?: {
		filename: string;
		autoload: boolean;
	};
}) => {
	const Nedb = (await import('nedb-electron')).default;
	const path = electronAPI.require('path') || global.path;
	path.dirname = path.dirname || global.path.dirname;

	const appData = await electronAPI.appData;
	const databasePathname = path.join(appData, 'snack-v1.db');

	const store = new Nedb({
		filename: databasePathname,
		autoload: true,
	});

	return {
		getItem: (key) => {
			return new Promise((resolve, reject) => {
				store.find({}, (err, data) => console.log(data));
				store.findOne({ key }, (err, data) => {
					if (err) resolve(JSON.stringify({}));
					if (!data) resolve(JSON.stringify({}));
					resolve(JSON.stringify(data));
				});
			});
		},
		setItem: (key, item) => {
			return new Promise((resolve) => {
				resolve(
					store.update(
						{ key },
						{ $set: { ...deepParseJson(item) } },
						{ upsert: true, new: true },
					),
				);
			});
		},
		removeItem: (key) => {
			return new Promise((resolve) => {
				resolve(store.remove({ key }));
			});
		},
	};
};

export default createSnackStorage;
