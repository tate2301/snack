import { Client } from '../tasks/Client';
import { Person } from '../tasks/types';
import { generateUUID } from '../functions';

export type ProjectType = "general" | "reminder" | "note" | "event";
export type PeriodicBilling = "hourly" | "weekly" | "monthly";
export type BillingType = "periodic" | "once-off";
export type ProjectStatus = "active" | "archived" | "completed";


export class Project {
	id: string;
	name: string;
	contractor: Person;
	description: string;
	billingType: BillingType;
	status: ProjectStatus;
	deadline: Date;
	client: Client;
	url?: string;
	periodicBilling?: PeriodicBilling;

	constructor(
		name: string,
		me: Person,
		description: string,
		billingType: "periodic" | "once-off",
		deadline: Date,
		client: Client,
		url?: string,
	) {
		this.id = generateUUID();
		this.name = name;
		this.contractor = me;
		this.description = description;
		this.billingType = billingType;
		this.deadline = deadline;
		this.client = client;
		this.url = url;
	}
}

