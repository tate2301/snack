import PouchDB from 'pouchdb';
import { User } from './types';
import { getApplicationVersion } from './updates';
import Logger from 'js-logger';

// For now I am just using a local pouch db. Support for remote db will be added later.

export class Database {
	private db: PouchDB.Database;
	private constructor() {
		this.db = new PouchDB(`snack-v${getApplicationVersion()}`);
		this.db.info().then(function (info) {
			Logger.log(info);
		});
	}

	static getInstance = () => {
		return new Database();
	};
}

interface Repository<T> {
	db: Database;

	save: (entity: T) => T;
	delete: (entity: T) => void;

	findAll(): T[];
	findOneById: (id: string) => T | undefined;
	findOne: (predicate: (entity: T) => boolean) => T | undefined;
	updateById: (id: string, entity: T) => T | undefined;
}
