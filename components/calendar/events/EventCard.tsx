import { formatTime } from '../../../lib/utils';
import clsx from 'clsx';
import { EVENT_COLORS } from '../../../constants/event-colors';
import { getCoordinatesOfEvent } from './utils';
import useResizableEvent from './hooks/useResizableEvent';
import { Resizable } from 'react-resizable';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export type EventCardProps = {
	startTime: Date;
	endTime: Date;
	title: string;
	description: string;
	location: string;
	color: string;
	id: string;
};

const CalendarEventCardContent = (props: EventCardProps) => {
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
			<p
				className={clsx(
					`order-2 capitalize hidden hover:block`,
					textColor,
					textHoverColor,
				)}>
				{props.description}
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

const DragHandle = () => (
	<div className="relative flex justify-center w-full mt-1 mb-2 cursor-n-resize">
		<div className="w-8 h-[4px] bg-white rounded-full hidden group-hover:flex drop-shadow-xl transition-all" />
	</div>
);

const CalendarEventCard = (
	props: EventCardProps & {
		trackLength: number;
		id: string;
		updateEvent: (event: EventCardProps) => void;
	},
) => {
	// Get the initial coordinates
	const coords = getCoordinatesOfEvent(
		props.startTime,
		props.endTime,
		props.trackLength,
	);
	// Get the resizable height
	const { height, handleResize } = useResizableEvent(
		coords.endY - coords.startY,
	);

	const {
		attributes,
		listeners,
		setNodeRef,
		over,
		transform,
		isDragging,
		activatorEvent,
	} = useDraggable({
		id: props.id,
		data: props,
	});

	const [bgColor, textColor, bgHoverColor, textHoverColor, ringColor] =
		EVENT_COLORS[props.color];

	const style = CSS.Transform.toString(transform);

	return (
		<Resizable
			height={height}
			width={Infinity}
			maxConstraints={[Infinity, props.trackLength]}
			handle={<DragHandle />}
			onResize={handleResize}>
			<div
				ref={setNodeRef}
				{...attributes}
				{...listeners}
				key={`event-${props.startTime.toString()}`}
				style={{
					top: `${coords.startY}px`,
					height: `${height}px`,
					transform: transform
						? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.05)`
						: 'none',
				}}
				className={clsx(
					'absolute left-0 w-full group !hover:h-fit cursor-pointer hover:z-40 hover:relative',
					'bg-opacity-50',
					'backdrop-blur-sm rounded-xl ',
					bgColor,
					bgHoverColor,
					textHoverColor,
					ringColor,
					isDragging && 'ring-2 z-30 shadow-2xl',
				)}>
				<CalendarEventCardContent {...props} />
			</div>
		</Resizable>
	);
};

export default CalendarEventCard;
