export type User = {
	id: string;
	fullname?: string;
	email?: string;
	password?: string;
	avatar: string;
};

export enum CalendarView {
	Daily = 'Daily',
	Week = 'Weekly',
	Monthly = 'Monthly',
}
