export enum SnackTaskPriority {
	Default = 'Default',
	Urgent = 'Urgent',
	High = 'High',
	Low = 'Low',
	MaybeLater = 'Maybe Later',
	Snoozed = 'Snoozed',
}

export enum SnackTaskStatus {
	Open = 'Open',
	InProgress = 'In Progress',
	Complete = 'Complete',
	Trashed = 'Trashed',
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
	subtasks: SnackTask[];
	tags: string[];
	createdAt: Date;
	lastUpdated: Date;
	trashed?: boolean;
};
