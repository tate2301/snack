import {
	add,
	differenceInHours,
	differenceInMinutes,
	eachHourOfInterval,
	endOfDay,
	isEqual,
	startOfDay,
	startOfToday,
} from 'date-fns';
import { Collision } from '@dnd-kit/core';
import { EventCardProps } from './EventCard';



export const colorMap = [
	'red',
	'blue',
	'green',
	'yellow',
	'orange',
	'purple',
	'pink',
	'indigo',
];

export const getCoordinatesOfEvent = (
	startTime: Date,
	endTime: Date,
	trackHeight: number,
	currentDate?: Date,
): {
	startY: number;
	endY: number;
} => {
	// Get minutes and express them as percentage of trackHeight
	let start = add(startTime, { hours: 0, minutes: 0 });
	const end = add(endTime, { hours: 0, minutes: 0 });

	if (currentDate) {
		if (!isEqual(startOfDay(currentDate), startOfDay(start))) {
			// If the event spans multiple days, set the start to the start of the day
			start = startOfDay(currentDate);
		}
	}

	const startY = start.getHours() * 60 + start.getMinutes();
	const endY = end.getHours() * 60 + end.getMinutes();
	const percentageOfStartY = startY / (24 * 60);
	const percentageOfEndY = endY / (24 * 60);
	const startYPosition = percentageOfStartY * trackHeight;
	const endYPosition = percentageOfEndY * trackHeight;

	return {
		startY: startYPosition,
		endY: endYPosition,
	};
};

/**
 *
 * @param y the y coordinate of the top of the event
 * @param trackHeight the length of the day column in pixels
 * @returns Date rounded of to the nearest 5 minutes
 */
export const convertCoordinatesToTimeRounded = (
	y: number,
	trackHeight: number,
	date?: Date,
): Date => {
	const percentageOfY = y / trackHeight;
	const minutes = percentageOfY * 24 * 60;
	const hours = Math.floor(minutes / 60);
	const minutesLeft = Math.floor(minutes % 60);
	const roundedMinutes = Math.round(minutesLeft / 5) * 5;

	if (date) {
		return add(date, {
			hours,
			minutes: roundedMinutes,
		});
	}

	return add(startOfToday(), {
		hours,
		minutes: roundedMinutes,
	});
};

export const getDayHourlyInterval = (start: Date) =>
	eachHourOfInterval(
		{
			start: startOfDay(start),
			end: endOfDay(start),
		},
		{
			step: 1,
		},
	);

export const getDayFromCollision = (collision: Collision) => {};

export const getRandomColorForEvent = (): string => {
	const randomIndex = Math.floor(Math.random() * colorMap.length);
	return colorMap[randomIndex];
};

export const generateEventTitle = (): string => {
	return "A random catch phrase"
	// return faker.company.catchPhrase();
};

export const generateEventDescription = (): string => {
	return "imagine in the future Lotus could award you points for completing notifications"
	// return faker.lorem.words(Math.floor(Math.random() * (20 - 5 + 1) + 5));
};

export const onlyAlldayEvents = (events: EventCardProps[]) => {
	const dayLength = 24 * 60;

	return events.filter(
		(event) =>
			differenceInHours(event.endTime, event.startTime) === 24 * 60 - 1,
	);
};

export const onlyNonAlldayEvents = (events: EventCardProps[]) => {
	return events.filter(
		(event) =>
			differenceInMinutes(event.endTime, event.startTime) !== 24 * 60 - 1,
	);
};
