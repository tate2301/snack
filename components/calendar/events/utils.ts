import { add, startOfToday } from 'date-fns';
import { faker } from '@faker-js/faker';

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
): {
	startY: number;
	endY: number;
} => {
	// Get minutes and express them as percentage of trackHeight
	const start = add(startTime, { hours: 0, minutes: 0 });
	const end = add(endTime, { hours: 0, minutes: 0 });

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

export const convertCoordinatesToTime = (
	y: number,
	trackHeight: number,
): Date => {
	const percentageOfY = y / trackHeight;
	const minutes = percentageOfY * 24 * 60;
	const hours = Math.floor(minutes / 60);
	const minutesLeft = Math.floor(minutes % 60);

	const time = add(startOfToday(), {
		hours,
		minutes: minutesLeft,
	});

	return time;
};

export const getRandomColorForEvent = (): string => {
	const randomIndex = Math.floor(Math.random() * colorMap.length);
	return colorMap[randomIndex];
};

export const generateEventTitle = (): string => {
	return faker.company.catchPhrase();
};

export const generateEventDescription = (): string => {
	return faker.lorem.words(Math.floor(Math.random() * (20 - 5 + 1) + 5));
};
