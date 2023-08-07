export enum CalendarView {
	Day = 'day',
	Week = 'week',
	Month = 'month',
}

export enum CalendarViewDirection {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
}

export type CalendarProps = {
	selectedDate: Date;
};

export type WeekCalendarProps = {
	week: Date[];
} & CalendarProps;
