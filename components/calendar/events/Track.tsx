import { add } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import CalendarEventCard from './EventCard';
import { generateEventTitle, getCoordinatesOfEvent } from './utils';
import { CalendarView } from '../types';
import { SnackEvent } from '../../../redux/events/types';
import { createTemplateEvent } from '../../../redux/events/utils';

type EventTrackProps = {
	date: Date;
	events: SnackEvent[];
	updateEvent: (event: SnackEvent) => void;
	createEvent: (event: SnackEvent) => void;
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

		const event = createTemplateEvent(generateEventTitle());
		event.startTime = date;
		event.endTime = add(date, { minutes: 30 });

		props.createEvent(event);
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
			className="absolute top-0 left-0 w-full h-full !border-0">
			<div className="relative w-full h-full">
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
