import { generateUUID } from '../functions';

export class Client {
	name: string;
	contactPerson: string;
	email: string;
	phone: string;
	url: string;
	profilePicture: string;
	notes: string;
	location: string;
	id: string;

	constructor(
		name: string,
		contactPerson: string,
		email: string,
		phone: string,
		url: string,
		profilePicture: string,
		notes: string,
		location: string
	) {
		this.id = generateUUID();
		this.name = name;
		this.contactPerson = contactPerson;
		this.email = email;
		this.phone = phone;
		this.url = url;
		this.profilePicture = profilePicture;
		this.notes = notes;
		this.location = location;
	}
}
