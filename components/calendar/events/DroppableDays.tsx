import { createSnapModifier } from '@dnd-kit/modifiers';
import { EventCardProps } from './EventCard';
import {
	useState,
	useRef,
	useEffect,
	useCallback,
	MutableRefObject,
} from 'react';
import {
	convertCoordinatesToTimeRounded,
	generateEventDescription,
	generateEventTitle,
	getRandomColorForEvent,
	getDayHourlyInterval,
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
	eachHourOfInterval,
	endOfDay,
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
import { time } from 'console';

// 5m intervals = 288 intervals per day with 80px per hr
const snapHeight = 80 / 12;
const snapToGridModifier = createSnapModifier(snapHeight);

const DroppableDays = (props: {
	week: Date[];
	containerRef: MutableRefObject<HTMLDivElement>;
}) => {
	const [collisions, setCollisions] = useState<Collision[]>([]);
	const [events, setEvents] = useState<EventCardProps[]>([]);
	const daysContainerRef = useRef<HTMLDivElement>();
	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = useCallback(
		(event) => {
			const { collisions, active } = event;
			const oldCalendarEvent = active.data.current;
			const calendarContainer = props.containerRef.current;
			const daysContainer = daysContainerRef.current;
			/**
			 * Collisions have the following type
			 * {
			 * 	data: {
			 * 		droppableContainer: {
			 * 			top: number;
			 * 			bottom: number;
			 * 			left: number;
			 * 			right: number;
			 * 			time: Date
			 * 		}
			 * 	}
			 * }
			 */
			const topMostCollision = collisions[0];

			console.log({
				scrollHeight: calendarContainer.scrollHeight,
				detail: calendarContainer.scrollTop,
				topMostCollision,
			});

			if (!calendarContainer || !daysContainer) return;

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
				top: topMostCollision,
				bottom: collisions[collisions.length - 1],
			};

			const offset = Object.keys(LAYOUT)
				.map((key) => LAYOUT[key])
				.reduce((prev, current) => prev + current, 0);

			const yTop =
				top.data.droppableContainer.top -
				daysContainer.offsetTop +
				calendarContainer.scrollTop;
			const newStartTime = convertCoordinatesToTimeRounded(
				yTop > 0 ? yTop : 0,
				80 * 24,
				startOfDay(topMostCollision.data.droppableContainer.time),
			);
			// Round of new time to the nearest 5 minute interval

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
		[props.containerRef.current],
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

	const createEvent = (event: EventCardProps) => {
		setEvents((events) => [...events, event]);
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
			<DndContext
				onDragMove={handleDragMove}
				autoScroll={true}
				modifiers={[snapToGridModifier]}
				sensors={sensors}
				collisionDetection={custom5MinuteCollisions}
				onDragEnd={handleDragEnd}>
				{props.week.map((day, index) => (
					<div
						ref={daysContainerRef}
						className={clsx('divide-y relative')}>
						{isEqual(day, startOfToday()) && <Timestamp />}
						<EventsTrack
							updateEvent={updateEvent}
							createEvent={createEvent}
							events={events.filter((e) =>
								isEqual(startOfDay(e.startTime), startOfDay(day)),
							)}
							date={day}
						/>
						{getDayHourlyInterval(day).map((time, idx) => (
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
				))}
			</DndContext>
		</>
	);
};

export default DroppableDays;
