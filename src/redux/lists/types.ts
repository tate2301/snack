import { SnackTask } from '../tasks/types';

export enum SnackProjectBillingType {
	HOURLY,
	WEEKlY,
	MONTHLY,
	ONCE_OFF,
}

export type SnackList = {
	id: string;
	name: string;
	tasks: string[];
	color: string;
	description?: string;
	icon?: string;
	billing?: SnackBilling;
	owner?: SnackProjectOwner;
	timer?: SnackProjectTimer;
};

export type SnackProjectTimer = {
	slots: Array<{
		start: Date;
		end: Date;
	}>;
};

export type SnackBilling = {
	budget?: number;
	rate_type: SnackProjectBillingType;
	rate: number;
};

export type SnackProjectOwner = {
	name: string;
	email_address?: string;
	display_picture?: string;
};
