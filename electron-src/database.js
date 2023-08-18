const Datastore = require('nedb');

class SnackDatabase {
	static instance;
	static db;

	constructor() {}

	static getInstance() {
		if (!SnackDatabase.instance) {
			SnackDatabase.instance = new SnackDatabase();
		}
		return SnackDatabase.instance;
	}

	async init(pathname = 'snack.db') {
		this.db = new Datastore({ filename: pathname, autoload: true });
	}
}

module.exports = SnackDatabase;
