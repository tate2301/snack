import { createSlice } from '@reduxjs/toolkit';
import { SnackEvent } from './types';
import _ from 'lodash';
import { isEqual } from 'date-fns';
import { RootState } from '../store';

const initialState: {
	items: SnackEvent[];
} = {
	items: [],
};

export const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		addEvent: (state, action) => {
			state.items.push(action.payload);
		},
		deleteEvent: (state, action) => {
			state.items = state.items.filter((event) => event.id !== action.payload);
		},
		updateEvent: (state, action) => {
			const {
				id,
				title,
				startTime,
				endTime,
				priority,
				status,
				tags,
				color,
				allDay,
				description,
				link,
				complete,
			} = action.payload as SnackEvent;

			const existingEvent = state.items.find((event) => event.id === id);
			if (existingEvent) {
				existingEvent.title = title;
				existingEvent.startTime = startTime;
				existingEvent.endTime = endTime;
				existingEvent.priority = priority;
				existingEvent.status = status;
				existingEvent.tags = tags;
				existingEvent.color = color;
				existingEvent.allDay = allDay;
				existingEvent.description = description;
				existingEvent.link = link;
				existingEvent.complete = complete;
				existingEvent.lastUpdated = new Date();
			}
		},
		rescheduleEvent: (state, action) => {
			const { id, startTime, endTime } = action.payload;
			const existingEvent = state.items.find((event) => event.id === id);
			if (existingEvent) {
				existingEvent.startTime = startTime;
				existingEvent.endTime = endTime;
				existingEvent.lastUpdated = new Date();
			}
		},
	},
});

export const { addEvent, deleteEvent, updateEvent, rescheduleEvent } =
	eventsSlice.actions;

export default eventsSlice.reducer;

/** Selectors */
export const selectEvents = (state: RootState) =>
	_.sortBy(state.events.items, (event) => event.startTime).reverse();

export const selectEventById = (state: RootState, id: string) =>
	state.events.items.find((event) => event.id === id);

export const selectAllDayEvents = (state: {
	events: { items: SnackEvent[] };
}) =>
	_.sortBy(
		state.events.items.filter((event) => event.allDay),
		(event) => event.startTime,
	).reverse();

export const selectAllDayEventsByDate = (state: RootState, date: Date) =>
	_.sortBy(
		state.events.items.filter(
			(event) => isEqual(event.startTime, date) && event.allDay,
		),
		(event) => event.startTime,
	).reverse();

export const selectEventsByDate = (state: RootState, date: Date) =>
	_.sortBy(
		state.events.items.filter(
			(event) => isEqual(event.startTime, date) || isEqual(event.endTime, date),
		),
		(event) => event.startTime,
	).reverse();

export const selectEventsByDateRange = (
	state: RootState,
	startDate: Date,
	endDate: Date,
) =>
	_.sortBy(
		state.events.items.filter(
			(event) =>
				(event.startTime >= startDate && event.startTime <= endDate) ||
				(event.endTime >= startDate && event.endTime <= endDate),
		),
		(event) => event.startTime,
	).reverse();

export const selectEventsByTag = (state: RootState, tag: string) =>
	_.sortBy(
		state.events.items.filter((event) => event.tags.includes(tag)),
		(event) => event.startTime,
	).reverse();
