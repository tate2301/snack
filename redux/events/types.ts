export enum SnackEventPriority {
	Default = 'Default',
	Urgent = 'Urgent',
	High = 'High',
	Low = 'Low',
	MaybeLater = 'Maybe Later',
	Snoozed = 'Snoozed',
}

export enum SnackEventStatus {
	Open = 'Open',
	InProgress = 'In Progress',
	Complete = 'Complete',
}

export type SnackEvent = {
	id: string;
	title: string;
	startTime: Date;
	endTime: Date;
	priority: SnackEventPriority;
	status: SnackEventStatus;
	tags: string[];
	createdAt: Date;
	lastUpdated: Date;
	color: string;
	allDay: boolean;
	description?: string;
	link?: string;
	complete?: boolean;
};
