export enum SnackTaskPriority {
	Default = 'Default',
	Urgent = 'Urgent',
	High = 'High',
	Low = 'Low',
	MaybeLater = 'Maybe Later',
	Snoozed = 'Snoozed',
}

export enum SnackTaskStatus {
	Todo = 'Todo',
	InProgress = 'In Progress',
	Complete = 'Complete',
	Blocked = 'Blocked',
}

export type SnackTask = {
	id: string;
	title: string;
	description?: string;
	deadline?: Date;
	link?: string;
	priority: SnackTaskPriority;
	complete?: boolean;
	status: SnackTaskStatus;
	subtasks: SnackSubtask[];
	tags: string[];
	createdAt: Date;
	lastUpdated: Date;
	trashed?: boolean;
};

export type SnackSubtask = {
	id: string;
	title: string;
	complete: boolean;
};
