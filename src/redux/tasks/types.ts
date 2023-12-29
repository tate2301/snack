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

export enum SnackTaskCategory {
	Design = 'Design',
	Development = 'Development',
	Marketing = 'Marketing',
}

export type SnackTaskSession = {
	startTime: Date;
	endTime: Date;
};

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
	emoji?: string;
	uuid?: string;
	billingRate?: {
		period: string;
		amount: number;
	};
	category?: SnackTaskCategory;
	sessions?: Array<SnackTaskSession>;
	pinned?: boolean;
};

export type SnackSubtask = {
	id: string;
	title: string;
	complete: boolean;
};
