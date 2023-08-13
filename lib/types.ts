export type User = {
	id: string;
	fullname?: string;
	email?: string;
	password?: string;
	avatar: string;
};

export type SnackTask = {
	id: string;
	title: string;
	description: string;

}

export type SnackEvent = {
	id: string;
	title: string;
	description: string;
	startTime: Date;
	endTime: Date;
	color: string
	location?: string
	allDay?: boolean
}