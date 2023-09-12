import { add } from 'date-fns';
import { SnackEvent, SnackEventPriority, SnackEventStatus } from './types';
import { generateUUID } from '../../lib/functions';
import { getRandomColorForEvent } from '../../lib/utils';

export const createTemplateEvent = (title: string): SnackEvent => {
	return {
		id: generateUUID(),
		title,
		startTime: new Date(),
		endTime: add(new Date(), { hours: 1 }),
		priority: SnackEventPriority.Default,
		status: SnackEventStatus.Open,
		tags: [],
		createdAt: new Date(),
		lastUpdated: new Date(),
		color: getRandomColorForEvent(),
		allDay: false,
		description: '',
		link: '',
		complete: false,
	};
};
