import { createSnapModifier } from '@dnd-kit/modifiers';
import { EventCardProps } from './EventCard';
import { useState, useRef } from 'react';
import {
	convertCoordinatesToTime,
	generateEventDescription,
	generateEventTitle,
	getRandomColorForEvent,
} from './utils';
import { generateUUID } from '../../../lib/functions';
import {
	Collision,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import clsx from 'clsx';
import { add, isEqual, startOfToday } from 'date-fns';
import Timestamp from '../canvas/Timestamp';
import EventsTrack from './Track';
import DroppableColumn from './DroppableColumn';
import {
	CollisionsArgs,
	custom5MinuteCollisions,
	customDayTimeCollisions,
} from '../../../lib/draggable';

// 5m intervals = 288 intervals per day with 80px per hr
const snapHeight = 80 / 12;
const snapToGridModifier = createSnapModifier(snapHeight);

const DroppableDays = (props: { week: Date[]; timeIntervals: Date[] }) => {
	const [collisions, setCollisions] = useState<Collision[]>([]);
	const [events, setEvents] = useState<EventCardProps[]>([
		{
			color: getRandomColorForEvent(),
			description: generateEventDescription(),
			title: generateEventTitle(),
			location: '',
			startTime: new Date(),
			endTime: new Date(),
			id: generateUUID(),
		},
	]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor),
	);

	function handleDragEnd(event) {
		const { active, over } = event;
		//const { offset } = active.data.current;
		const top = Math.abs(over.rect.top) + event.delta.y;

		const time = convertCoordinatesToTime(over.rect.top, 80 * 24);
		const initialTime = convertCoordinatesToTime(active.rect.top, 80 * 24);

		setCollisions([]);

		console.log({
			event,
		});
	}

	function handleDragMove(event) {
		const { active, over } = event;
		//const { offset } = active.data.current;
		const top = Math.abs(over.rect.top) + event.delta.y;

		const time = convertCoordinatesToTime(over.rect.top, 80 * 24);
		const initialTime = convertCoordinatesToTime(active.rect.top, 80 * 24);

		setCollisions(event.collisions);
		console.log({
			event,
		});
	}

	const updateEvent = (event: EventCardProps) => {
		setEvents((events) => {
			const index = events.findIndex((e) => e.id === event.id);
			const newEvents = [...events];
			newEvents[index] = event;
			return newEvents;
		});
	};

	return (
		<>
			{props.week.map((day, index) => (
				<DndContext
					onDragMove={handleDragMove}
					autoScroll={true}
					modifiers={[snapToGridModifier]}
					sensors={sensors}
					collisionDetection={custom5MinuteCollisions}
					onDragEnd={handleDragEnd}>
					<div className={clsx('relative divide-y')}>
						{isEqual(day, startOfToday()) && <Timestamp />}
						<EventsTrack
							updateEvent={updateEvent}
							events={events.map((e) => ({
								...e,
								startTime: add(day, { hours: 1, minutes: 30 }),
								endTime: add(day, { hours: 2, minutes: 59 }),
							}))}
							date={day}
						/>
						{props.timeIntervals.map((time, idx) => (
							<>
								<DroppableColumn
									idx={idx}
									time={time}
									key={`time-${time.toString()}`}
									collisions={collisions}
								/>
							</>
						))}
					</div>
				</DndContext>
			))}
		</>
	);
};

export default DroppableDays;
