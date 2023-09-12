import { Database } from '../database';

export default class SnackApplication<TUser> {
	database: Database;
	user: TUser;

	private constructor() {
		this.database = Database.getInstance();
	}

	static getInstance<TUser>() {
		return new SnackApplication<TUser>();
	}

	async init() {
		throw new Error('Not implemented');
	}
}
