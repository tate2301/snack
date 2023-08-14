import { createSnapModifier } from '@dnd-kit/modifiers';
import { EventCardProps } from './EventCard';
import { MutableRefObject } from 'react';
import { getDayHourlyInterval } from './utils';
import clsx from 'clsx';
import { isEqual, startOfDay, startOfToday } from 'date-fns';
import Timestamp from '../canvas/Timestamp';
import EventsTrack from './Track';
import DroppableColumn from './DroppableColumn';
import { HOUR_HEIGHT } from '../../../constants/styles';
import { CalendarView } from '../types';

// 5m intervals = 288 intervals per day with 80px per hr
const snapHeight = HOUR_HEIGHT / 60;
const snapToGridModifier = createSnapModifier(snapHeight);

const DroppableDays = (props: {
	week: Date[];
	containerRef: MutableRefObject<HTMLDivElement>;
	daysContainerRef: MutableRefObject<HTMLDivElement>;
	createEvent: (event: EventCardProps) => void;
	updateEvent: (event: EventCardProps) => void;
	events: EventCardProps[];
	view: CalendarView;
}) => {
	return (
		<>
			{props.week.map((day, index) => (
				<div
					ref={props.daysContainerRef}
					className={clsx('divide-y relative')}>
					{isEqual(day, startOfToday()) && <Timestamp />}
					<EventsTrack
						view={props.view}
						updateEvent={props.updateEvent}
						createEvent={props.createEvent}
						events={props.events.filter(
							(e) =>
								isEqual(startOfDay(e.startTime), startOfDay(day)) ||
								isEqual(startOfDay(e.endTime), startOfDay(day)),
						)}
						date={day}
					/>
					{getDayHourlyInterval(day).map((time, idx) => (
						<>
							<DroppableColumn
								idx={idx}
								time={time}
								key={`time-${time.toString()}`}
							/>
						</>
					))}
				</div>
			))}
		</>
	);
};

export default DroppableDays;
