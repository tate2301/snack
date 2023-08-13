import { add } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import CalendarEventCard, { EventCardProps } from './EventCard';
import { generateEventDescription, generateEventTitle, getCoordinatesOfEvent, getRandomColorForEvent } from './utils';
import { generateUUID } from '../../../lib/functions';
import { CalendarView } from '../types';

type EventTrackProps = {
	date: Date;
	events: EventCardProps[];
	updateEvent: (event: EventCardProps) => void;
	createEvent: (event: EventCardProps) => void;
	view: CalendarView;
};

const EventsTrack = (props: EventTrackProps) => {
	const ref = useRef(null);
	const [startTimeY, setStartTimeY] = useState<number>(0);
	const [trackLength, setTrackLength] = useState<number>(0);

	const onCreateEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

		props.createEvent({
			color: getRandomColorForEvent(),
			description: generateEventDescription(),
			title: generateEventTitle(),
			location: '',
			// round start time to the nearest 5
			startTime: date,
			endTime: add(date, { minutes: 0, hours: 1 }),
			id: generateUUID(),
		});
	};

	// set the track length when ref is set
	useEffect(() => {
		if (ref.current) {
			setTrackLength(ref.current.getBoundingClientRect().height);
		}
	}, [ref.current]);

	return (
		<div
			onDoubleClick={onCreateEvent}
			ref={ref}
			className='absolute top-0 left-0 w-full h-full'>
			<div className='relative w-full h-full'>
				{props.events.map((event, idx) => (
					<CalendarEventCard
						view={props.view}
						trackLength={trackLength}
						{...event}
						updateEvent={props.updateEvent}
						date={props.date}
					/>
				))}
			</div>
		</div>
	);
};

export default EventsTrack;
