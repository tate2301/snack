import { createSnapModifier } from '@dnd-kit/modifiers';
import { EventCardProps } from './EventCard';
import { useState, useRef, useEffect, useCallback } from 'react';
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
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import clsx from 'clsx';
import {
	add,
	differenceInMinutes,
	isEqual,
	startOfDay,
	startOfToday,
} from 'date-fns';
import Timestamp from '../canvas/Timestamp';
import EventsTrack from './Track';
import DroppableColumn from './DroppableColumn';
import { custom5MinuteCollisions } from '../../../lib/draggable';
import NewEventStartTime from '../canvas/NewEventStartTime';
import { LAYOUT } from '../../../constants/dimensions';

// 5m intervals = 288 intervals per day with 80px per hr
const snapHeight = 80 / 12;
const snapToGridModifier = createSnapModifier(snapHeight);

const DroppableDays = (props: { week: Date[]; timeIntervals: Date[] }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const [collisions, setCollisions] = useState<Collision[]>([]);
	const [events, setEvents] = useState<EventCardProps[]>([]);

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = useCallback(
		(event) => {
			const { collisions, active } = event;
			const oldCalendarEvent = active.data.current;

			const {
				top,
			}: {
				[key in 'top' | 'bottom']: {
					data: {
						droppableContainer: {
							bottom: number;
							top: number;
							width: number;
							height: number;
						};
						id: string;
					};
				};
			} = {
				top: collisions[0],
				bottom: collisions[collisions.length - 1],
			};

			const offset = Object.keys(LAYOUT)
				.map((key) => LAYOUT[key])
				.reduce((prev, current) => prev + current, 0);

			console.log({ offset });

			const yTop = top.data.droppableContainer.top - offset;
			const newStartTime = convertCoordinatesToTime(yTop, 80 * 24);

			const lengthOfEventInMinutes = differenceInMinutes(
				oldCalendarEvent.endTime,
				oldCalendarEvent.startTime,
			);
			const newCalendarEvent: EventCardProps = {
				id: oldCalendarEvent.id,
				color: oldCalendarEvent.color,
				description: oldCalendarEvent.description,
				location: oldCalendarEvent.location,
				title: oldCalendarEvent.title,
				startTime: newStartTime,
				endTime: add(newStartTime, {
					minutes: lengthOfEventInMinutes,
				}),
			};

			updateEvent(newCalendarEvent);
			setCollisions([]);
		},
		[containerRef.current],
	);

	function handleDragMove(event) {
		setCollisions(event.collisions);
	}

	const updateEvent = (event: EventCardProps) => {
		setEvents((events) => {
			const index = events.findIndex((e) => e.id === event.id);
			const newEvents = [...events];
			newEvents[index] = event;
			return newEvents;
		});
	};

	useEffect(() => {
		setEvents([
			{
				color: getRandomColorForEvent(),
				description: generateEventDescription(),
				title: generateEventTitle(),
				location: '',
				startTime: add(startOfToday(), { hours: 1, minutes: 30 }),
				endTime: add(startOfToday(), { hours: 2, minutes: 0 }),
				id: generateUUID(),
			},
		]);
	}, []);

	return (
		<>
			{collisions.length !== 0 && (
				<NewEventStartTime
					containerRef={containerRef}
					topCollision={collisions[0]}
				/>
			)}
			{props.week.map((day, index) => (
				<DndContext
					onDragMove={handleDragMove}
					autoScroll={true}
					modifiers={[snapToGridModifier]}
					sensors={sensors}
					collisionDetection={custom5MinuteCollisions}
					onDragEnd={handleDragEnd}>
					<div
						ref={containerRef}
						className={clsx('relative divide-y')}>
						{isEqual(day, startOfToday()) && <Timestamp />}
						<EventsTrack
							updateEvent={updateEvent}
							createEvent={updateEvent}
							events={events.filter((e) =>
								isEqual(startOfDay(e.startTime), startOfDay(day)),
							)}
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
