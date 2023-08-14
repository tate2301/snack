import { formatTime } from '../../../lib/utils';
import clsx from 'clsx';
import { EVENT_COLORS } from '../../../constants/event-colors';
import { getCoordinatesOfEvent } from './utils';
import useResizableEvent from './hooks/useResizableEvent';
import { useDraggable } from '@dnd-kit/core';
import { useMemo } from 'react';
import { CalendarView } from '../types';
import { SnackEvent } from '../../../redux/events/types';

const CalendarEventCardContent = (props: SnackEvent) => {
	const [bgColor, textColor, bgHoverColor, textHoverColor] =
		EVENT_COLORS[props.color];

	return (
		<div
			className={clsx(
				'flex flex-col px-2 overflow-y-auto text-sm leading-5 h-full',

				textColor,
				textHoverColor,
			)}>
			<p
				className={clsx(
					`order-1 capitalize font-semibold line-clamp-1`,
					textColor,
					textHoverColor,
				)}>
				{props.title}
			</p>
			<p className={clsx('uppercase line-clamp-1', textColor, textHoverColor)}>
				<time dateTime={props.startTime.toString()}>
					{formatTime(props.startTime)}
				</time>{' '}
				-{' '}
				<time dateTime={props.endTime.toString()}>
					{formatTime(props.endTime)}
				</time>
			</p>
		</div>
	);
};

const CalendarEventCard = (
	props: SnackEvent & {
		trackLength: number;
		id: string;
		updateEvent: (event: SnackEvent) => void;
		date: Date;
		view: CalendarView;
	},
) => {
	// Get the initial coordinates
	const coords = getCoordinatesOfEvent(
		props.startTime,
		props.endTime,
		props.trackLength,
		props.date,
	);
	// Get the resizable height
	const initial_height = useMemo(() => {
		if (coords.endY < coords.startY) {
			return props.trackLength - coords.startY;
		}

		return coords.endY - coords.startY;
	}, [coords]);
	const { height, handleResize } = useResizableEvent(initial_height);

	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: props.id,
			data: {
				...props,
				supports: ['droppableDay', 'droppableAllDaySlot'],
			},
		});

	const [bgColor, textColor, bgHoverColor, textHoverColor, ringColor] =
		EVENT_COLORS[props.color];

	return (
		<div>
			<div
				ref={setNodeRef}
				{...attributes}
				{...listeners}
				key={`event-${props.startTime.toString()}`}
				style={{
					top: `${coords.startY}px`,
					height: `${Math.abs(height)}px`,
					transform: transform
						? `translate3d(${transform.x}px, ${transform.y}px, 0)`
						: 'none',
				}}
				className={clsx(
					'absolute left-0 w-full group cursor-pointer border-2 border-white shadow',
					'bg-opacity-50',
					'rounded',
					bgColor,
					bgHoverColor,
					textHoverColor,
					ringColor,
					isDragging && 'z-30 shadow-2xl',
				)}>
				<CalendarEventCardContent {...props} />
			</div>
		</div>
	);
};

export default CalendarEventCard;
