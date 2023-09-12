import { SnackTask } from '../tasks/types';

export type SnackList = {
	id: string;
	name: string;
	tasks: string[];
	color: string;
	description?: string;
	icon?: string;
};
