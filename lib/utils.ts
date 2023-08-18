import { add } from 'date-fns';
import { SnackEvent } from '../redux/events/types';

export const remToPx = (rem) => {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

/**
 *
 * @param event The event to be added to the calendar.
 * @returns The event's grid meta data.
 * @description This hook is used to render an event on the calendar.
 */
export const getEventPosition = (event: SnackEvent) => {
	const start = new Date(event.startTime);
	const end = new Date(event.endTime);
	const startHour = start.getHours();
	const startMinute = start.getMinutes();
	const endHour = end.getHours();
	const endMinute = end.getMinutes();
	const startCol = startHour * 12 + Math.floor(startMinute / 5);
	const endCol = endHour * 12 + Math.floor(endMinute / 5);
	const span = endCol - startCol;

	const dayIndex = start.getDay();

	return {
		start: startCol + 5, // Adding to account for the offset of the grid.
		span: span + 1, // This also accounts for the offset of the grid
		day: dayIndex,
	};
};

export const formatTime = (time: Date) =>
	Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	}).format(time);

export const getRandomColorForEvent = () => 'purple';
