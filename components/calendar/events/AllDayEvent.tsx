import { useDroppable } from '@dnd-kit/core';
import { useCallback, useRef } from 'react';
import { generateUUID } from '../../../lib/functions';
import clsx from 'clsx';
import { endOfToday, startOfDay } from 'date-fns';
import { generateEventTitle, getRandomColorForEvent } from './utils';
import { SnackEvent } from '../../../redux/events/types';
import { createTemplateEvent } from '../../../redux/events/utils';
import { useAppSelector } from '../../../redux/store';
import {
	selectAllDayEvents,
	selectAllDayEventsByDate,
} from '../../../redux/events';

function AllDayEvent(props: {
	week: Date[];
	createEvent: (event: SnackEvent) => void;
	updateEvent: (event: SnackEvent) => void;
	events: SnackEvent[];
}) {
	return (
		<div
			className="grid bg-surface-2 rounded-xl border"
			style={{
				gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
			}}>
			<p className="py-4 text-xs text-center uppercase">All Day</p>
			{props.week.map((day) => (
				<DroppableEventSlot
					createEvent={props.createEvent}
					time={day}
					events={props.events}
				/>
			))}
		</div>
	);
}

const DroppableEventSlot = (props: {
	time: Date;
	createEvent: (event: SnackEvent) => void;
	events: SnackEvent[];
}) => {
	const allDayEventsForDay = useAppSelector((state) =>
		selectAllDayEventsByDate(state, props.time),
	);
	const id = useRef(generateUUID());
	const { setNodeRef, isOver } = useDroppable({
		id: id.current,
		data: {
			type: 'droppableAllDaySlot',
			time: startOfDay(props.time),
		},
	});

	const onDoubleClick = useCallback(() => {
		const event = createTemplateEvent(generateEventTitle());
		event.startTime = startOfDay(props.time);
		event.endTime = endOfToday();
		event.allDay = true;

		props.createEvent(event);
	}, [props.createEvent]);

	return (
		<div
			ref={setNodeRef}
			onDoubleClick={onDoubleClick}
			className={clsx(
				'hover:bg-zinc-100 flex flex-col items-center gap-1 justify-center h-12',
				isOver && 'bg-primary-4',
			)}>
			{allDayEventsForDay.map((event) => (
				<div
					key={event.id}
					className="w-full h-full p-0.5 rounded-xl text-sm flex">
					<p className="line-clamp-1">{event.title}</p>
				</div>
			))}
		</div>
	);
};

export default AllDayEvent;
