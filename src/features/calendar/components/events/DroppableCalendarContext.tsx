import { ReactNode } from 'react';
import { createSnapModifier } from '@dnd-kit/modifiers';
import { EventCardProps } from './EventCard';
import { useRef, useCallback, MutableRefObject } from 'react';
import { convertCoordinatesToTimeRounded } from './utils';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { add, differenceInMinutes, endOfDay, startOfDay } from 'date-fns';
import { custom5MinuteCollisions } from '../../../../lib/draggable';
import { HOUR_HEIGHT } from '../../../../constants/dimensions';

// 5m intervals = 288 intervals per day with 80px per hr
const snapHeight = HOUR_HEIGHT / 60;
const snapToGridModifier = createSnapModifier(snapHeight);

const DroppableCalendarContext = (props: {
	children: ({
		daysContainerRef,
	}: {
		daysContainerRef: MutableRefObject<HTMLDivElement>;
	}) => ReactNode;
	week: Date[];
	containerRef: MutableRefObject<HTMLDivElement>;
	events: EventCardProps[];
	updateEvent: (event: EventCardProps) => void;
	createEvent: (event: EventCardProps) => void;
}) => {
	const daysContainerRef = useRef<HTMLDivElement>();
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const updateEvent = useCallback(
		(event: EventCardProps) => {
			props.updateEvent(event);
		},
		[props.updateEvent],
	);

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
				scrollTop: calendarContainer.scrollTop,
				rect: calendarContainer.getBoundingClientRect(),
				topMostCollision,
			});

			if (!calendarContainer || !daysContainer || !topMostCollision) return;

			if (
				topMostCollision.data.droppableContainer.data?.current.type ===
				'droppableAllDaySlot'
			) {
				// 24 hour event
				updateEvent({
					...oldCalendarEvent,
					startTime: startOfDay(oldCalendarEvent.startTime),
					endTime: endOfDay(oldCalendarEvent.startTime),
				});
				return;
			}

			const top =
				topMostCollision.data.droppableContainer.collisionRect?.top ??
				topMostCollision.data.droppableContainer.rect.current.top;

			const yTop = top - daysContainer.offsetTop + calendarContainer.scrollTop;

			const newStartTime = convertCoordinatesToTimeRounded(
				yTop > 0 ? yTop : 0,
				HOUR_HEIGHT * 24,
				startOfDay(topMostCollision.data.droppableContainer.time),
			);

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

			if (
				topMostCollision.data.droppableContainer.data?.current.time &&
				isNaN(newStartTime.getTime())
			) {
				// Event has been dragged to a time below 11:30 might overspill to next day
				// newStartTime is Invalid Date so lets get the new time from the droppable container
				// and that becomes the new start time

				const newTime = convertCoordinatesToTimeRounded(
					yTop > 0 ? yTop : 0,
					HOUR_HEIGHT * 24,
					startOfDay(
						topMostCollision.data.droppableContainer.data.current.time,
					),
				);
				newCalendarEvent.startTime = newTime;
				newCalendarEvent.endTime = add(newTime, {
					minutes: lengthOfEventInMinutes,
				});

				console.log({ newTime });
			}

			console.log({
				newStartTime,
				yTop,
				lengthOfEventInMinutes,
				top,
				topMostCollision,
				track: HOUR_HEIGHT * 24,
				time: topMostCollision.data.droppableContainer.data?.current.time,
			});

			// Event happens to cross over into the next day

			updateEvent(newCalendarEvent);
		},
		[props.containerRef.current],
	);

	return (
		<>
			<DndContext
				autoScroll={true}
				modifiers={[snapToGridModifier]}
				sensors={sensors}
				collisionDetection={custom5MinuteCollisions}
				onDragEnd={handleDragEnd}>
				<>{props.children({ daysContainerRef })}</>
			</DndContext>
		</>
	);
};

export default DroppableCalendarContext;
