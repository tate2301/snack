import { useDroppable } from '@dnd-kit/core';
import { useCallback, useRef } from 'react';
import { generateUUID } from '../../../lib/functions';
import clsx from 'clsx';
import { endOfToday, startOfDay } from 'date-fns';
import { EventCardProps } from './EventCard';
import { generateEventTitle, getRandomColorForEvent } from './utils';

function AllDayEvent(props: {
	week: Date[];
	createEvent: (event: EventCardProps) => void;
	updateEvent: (event: EventCardProps) => void;
	events: EventCardProps[];
}) {
	return (
		<div
			className="grid uppercase divide-x bg-surface-2 rounded-xl"
			style={{
				gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
			}}>
			<p className="py-4 text-xs text-center">All Day</p>
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
	createEvent: (event: EventCardProps) => void;
	events: EventCardProps[];
}) => {
	const id = useRef(generateUUID());
	const { setNodeRef, isOver } = useDroppable({
		id: id.current,
		data: {
			type: 'droppableAllDaySlot',
			time: startOfDay(props.time),
		},
	});

	const onDoubleClick = useCallback(() => {
		props.createEvent({
			id: generateUUID(),
			title: generateEventTitle(),
			description: '',
			color: getRandomColorForEvent(),
			startTime: startOfDay(props.time),
			endTime: endOfToday(),
			location: '',
		});
	}, [props.createEvent]);

	return (
		<div
			ref={setNodeRef}
			onDoubleClick={onDoubleClick}
			className={clsx(
				'hover:bg-zinc-100 flex flex-col items-center justify-center h-12 uppercase',
				isOver && 'bg-primary-4',
			)}>
			{props.events.length}
		</div>
	);
};

export default AllDayEvent;
