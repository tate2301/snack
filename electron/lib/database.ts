const Datastore = require('nedb');

class SnackDatabase {
	static instance: any;
	static db: any;

	constructor() {}

	static getInstance() {
		if (!SnackDatabase.instance) {
			SnackDatabase.instance = new SnackDatabase();
		}
		return SnackDatabase.instance;
	}

	async init(pathname = 'snack.db') {
		SnackDatabase.db = new Datastore({ filename: pathname, autoload: true });
	}
}

module.exports = SnackDatabase;
