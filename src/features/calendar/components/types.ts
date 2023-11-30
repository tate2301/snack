import { EventCardProps } from './events/EventCard';

export enum CalendarDefs {
	TimezoneWidth = 'w-24',
	BorderColor = 'border-zinc-100',
}

export enum CalendarView {
	Day = 'day',
	Week = 'week',
	Month = 'month',
	Planner = 'planner',
}

export enum CalendarViewDirection {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
}

export type CalendarProps = {
	selectedDate: Date;
	minimal?: boolean;
	events: Array<EventCardProps>
	selectDate: (d: Date) => void;
	updateEvent: (event: EventCardProps) => void
	createEvent: (event: EventCardProps) => void
};

export type DayCalendarProps = {
	week: Date[];
} & CalendarProps;

export type WeekCalendarProps = {
	week: Date[];
	daysToDisplay: number;
} & CalendarProps;

export type CalendarDayTimeProps = {
	timeIntervals: Date[];
	minimal?: boolean
};
