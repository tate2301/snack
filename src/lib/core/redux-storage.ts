import Nedb from 'nedb';
import path from 'path';
const { deepParseJson } = require('deep-parse-json');
const remote = require('@electron/remote');
export const userDataPath = remote.app.getPath('userData');

const createSnackStorage = (pre?: {
	store?: typeof Nedb;
	storeOptions?: {
		filename: string;
		autoload: boolean;
	};
}) => {
	const appData = userDataPath;
	const databasePathname = path.join(
		appData,
		pre?.storeOptions.filename || 'snack.db',
	);

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
						// @ts-ignore
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
