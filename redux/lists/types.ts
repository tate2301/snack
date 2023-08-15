import { SnackTask } from '../tasks/types';

export type SnackList = {
	id: string;
	name: string;
	tasks: string[];
	color: string;
	icon?: string;
};
