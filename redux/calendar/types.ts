import { CalendarView } from '../../components/calendar/types';

export type SnackCalendar = {
	id: string;
	title: string;
	color: string;
	emoji?: string;
	createdAt: Date;
	lastUpdated: Date;
	events: string[];
	tasks: string[];
};

export type SnackGlobalCalendar = {
	items: SnackCalendar[];
	selectedCalendars?: string[];
	selectedDate: Date;
	preferences: {
		view: CalendarView;
		width: number;
		expanded?: boolean;
	};
};
