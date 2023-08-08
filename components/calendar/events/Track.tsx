import { add } from 'date-fns';
import { useRef, useState } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
} from '@dnd-kit/sortable';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CSS } from '@dnd-kit/utilities';
import CalendarEventCard, { EventCardProps } from './EventCard';
import {
	generateEventDescription,
	generateEventTitle,
	getCoordinatesOfEvent,
	getRandomColorForEvent,
} from './utils';
import { generateUUID } from '../../../lib/functions';

type EventTrackProps = {
	date: Date;
	events: EventCardProps[];
	updateEvent: (event: EventCardProps) => void;
};

const EventsTrack = (props: EventTrackProps) => {
	const ref = useRef(null);

	const [startTimeY, setStartTimeY] = useState<number>(0);
	const [events, setEvents] = useState<EventCardProps[]>(props.events);

	const onTrackClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		// Capture the position where the mouse clicked on the track
		// Round of to the nearest 15 minutes and create a new event
		// with the start time at that position, and 30 minutes long
		// which is 40px. 1hr is 80px height.

		const { top, height } = ref.current.getBoundingClientRect();
		const { clientY } = e;
		const y = clientY - top;
		const percentageOfY = y / height;
		const minutes = Math.round(percentageOfY * 60 * 24);
		// round of minutes to closest 5 minute interval
		const date = add(props.date, { minutes: Math.round(minutes / 5) * 5 });
		const coordinates = getCoordinatesOfEvent(
			date,
			add(date, {
				minutes: 30,
			}),
			height,
		);

		setStartTimeY(coordinates.startY);

		setEvents([
			...events,
			{
				color: getRandomColorForEvent(),
				description: generateEventDescription(),
				title: generateEventTitle(),
				location: '',
				// round start time to the nearest 5
				startTime: date,
				endTime: add(date, { minutes: 30 }),
				id: generateUUID(),
			},
		]);
	};

	return (
		<div
			onClick={() => {}}
			ref={ref}
			className="absolute top-0 left-0 w-full h-full">
			<div className="relative w-full h-full">
				{events.map((event, idx) => (
					<CalendarEventCard
						trackLength={ref.current?.getBoundingClientRect().height ?? 0}
						{...event}
						updateEvent={props.updateEvent}
					/>
				))}
			</div>
		</div>
	);
};

export default EventsTrack;
