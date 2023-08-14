import { createSlice } from '@reduxjs/toolkit';
import { CalendarView } from '../../components/calendar/types';
import { SnackCalendar, SnackGlobalCalendar } from './types';
import { RootState } from '../store';
import { isEqual, startOfDay, startOfToday } from 'date-fns';
import { getRandomColorForEvent } from '../../components/calendar/events/utils';
import { generateUUID } from '../../lib/functions';

const defaultCalendar: SnackCalendar = {
	color: getRandomColorForEvent(),
	id: generateUUID(),
	title: 'Default Calendar',
	createdAt: new Date(),
	events: [],
	tasks: [],
	lastUpdated: new Date(),
	emoji: '📖',
};

const initialState: SnackGlobalCalendar = {
	items: [defaultCalendar],
	preferences: {
		view: CalendarView.Week,
		width: 1290,
	},
	selectedCalendars: [],
	selectedDate: startOfToday(),
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		addCalendar: (state, action) => {
			state.items.push(action.payload);
		},
		deleteCalendar: (state, action) => {
			state.items = state.items.filter(
				(calendar) => calendar.id !== action.payload,
			);
		},
		updateCalendar: (state, action) => {
			const { id, title, color, emoji } = action.payload;
			const existingCalendar = state.items.find(
				(calendar) => calendar.id === id,
			);
			if (existingCalendar) {
				existingCalendar.title = title;
				existingCalendar.color = color;
				existingCalendar.emoji = emoji;
				existingCalendar.lastUpdated = new Date();
			}
		},
		updateSelectedDate: (state, action) => {
			state.selectedDate = action.payload;
		},
		updatePreferences: (state, action) => {
			const { view, width, expanded } = action.payload;
			state.preferences.view = view;
			state.preferences.width = width;
			state.preferences.expanded = expanded;
		},
		toggleCalendar: (state, action) => {
			state.preferences.expanded = !state.preferences.expanded;
		},
		addEventToCalendar: (state, action) => {
			const { id, event } = action.payload;
			const existingCalendar = state.items.find(
				(calendar) => calendar.id === id,
			);
			if (existingCalendar) {
				existingCalendar.events.push(event);
				existingCalendar.lastUpdated = new Date();
			}
		},
		deleteEventFromCalendar: (state, action) => {
			const { id, eventId } = action.payload;
			const existingCalendar = state.items.find(
				(calendar) => calendar.id === id,
			);
			if (existingCalendar) {
				existingCalendar.events = existingCalendar.events.filter(
					(event) => event !== eventId,
				);
				existingCalendar.lastUpdated = new Date();
			}
		},
		addTaskToCalendar: (state, action) => {
			const { id, task } = action.payload;
			const existingCalendar = state.items.find(
				(calendar) => calendar.id === id,
			);
			if (existingCalendar) {
				existingCalendar.tasks.push(task);
				existingCalendar.lastUpdated = new Date();
			}
		},
		deleteTaskFromCalendar: (state, action) => {
			const { id, taskId } = action.payload;
			const existingCalendar = state.items.find(
				(calendar) => calendar.id === id,
			);
			if (existingCalendar) {
				existingCalendar.tasks = existingCalendar.tasks.filter(
					(task) => task !== taskId,
				);
				existingCalendar.lastUpdated = new Date();
			}
		},
	},
});

export const {
	addCalendar,
	deleteCalendar,
	updateCalendar,
	addEventToCalendar,
	deleteEventFromCalendar,
	addTaskToCalendar,
	deleteTaskFromCalendar,
	updatePreferences,
	updateSelectedDate,
	toggleCalendar,
} = calendarSlice.actions;

export default calendarSlice.reducer;

/** Selectors */
export const selectGlobalCalendar = (state: RootState) => state.calendars;

export const selectCalendars = (state: RootState) => state.calendars.items;

export const selectCalendarById = (state: RootState, calendarId) =>
	state.calendars.items.find((calendar) => calendar.id === calendarId);

export const selectCalendarEvents = (state: RootState, calendarId) =>
	state.calendars.items.find((calendar) => calendar.id === calendarId).events;

export const selectCalendarTasks = (state: RootState, calendarId) =>
	state.calendars.items.find((calendar) => calendar.id === calendarId).tasks;

export const selectCalendarPreferences = (state: RootState) =>
	state.calendars.preferences;

export const selectCalendarView = (state: RootState) =>
	state.calendars.preferences.view;

export const selectCalendarWidth = (state: RootState) =>
	state.calendars.preferences.width;

export const selectSelectedCalendars = (state: RootState) =>
	state.calendars.selectedCalendars;

export const selectSelectedDate = (state: RootState) =>
	state.calendars.selectedDate;

export const selectEventsForSelectedCalendars = (
	state: RootState,
	includeAllDay?: boolean,
) => {
	const selectedCalendars = state.calendars.selectedCalendars;

	if (selectedCalendars.length === 0) {
		if (includeAllDay) {
			return state.events.items;
		}
		return state.events.items.filter((event) => !event.allDay);
	}

	const eventsInSelectedCalendars = state.calendars.items.filter((calendar) =>
		selectedCalendars.includes(calendar.id),
	);
	const events = state.events.items;

	if (includeAllDay) {
		return events.filter((event) =>
			eventsInSelectedCalendars.some((calendar) =>
				calendar.events.includes(event.id),
			),
		);
	}

	return events.filter(
		(event) =>
			!event.allDay &&
			eventsInSelectedCalendars.some((calendar) =>
				calendar.events.includes(event.id),
			),
	);
};

export const selectTasksForSelectedCalendars = (state: RootState) => {
	const selectedCalendars = state.calendars.selectedCalendars;

	if (selectedCalendars.length === 0) return state.tasks.items;

	const tasksInSelectedCalendars = state.calendars.items.filter((calendar) =>
		selectedCalendars.includes(calendar.id),
	);
	const tasks = state.tasks.items;
	return tasks.filter((task) =>
		tasksInSelectedCalendars.some((calendar) =>
			calendar.tasks.includes(task.id),
		),
	);
};

export const selectEventsForSelectedDate = (state: RootState) => {
	const selectedDate = state.calendars.selectedDate;
	const events = state.events.items;
	return events.filter(
		(event) =>
			isEqual(startOfDay(event.startTime), selectedDate) ||
			isEqual(startOfDay(event.endTime), selectedDate),
	);
};

export const selectAllDayEventsForSelectedDate = (state: RootState) => {
	const selectedDate = state.calendars.selectedDate;
	const events = state.events.items;
	return events.filter(
		(event) => event.allDay && isEqual(event.startTime, selectedDate),
	);
};
