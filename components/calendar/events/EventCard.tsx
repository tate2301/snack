import { useMemo } from 'react';
import { formatTime, getEventPosition } from '../../../lib/utils';
import clsx from 'clsx';
import { EVENT_COLORS } from '../../../constants/event-colors';
import { getCoordinatesOfEvent } from './utils';

export type EventCardProps = {
	startTime: Date;
	endTime: Date;
	title: string;
	description: string;
	location: string;
	color: string;
};

const cols = [
	'col-start-2',
	'col-start-3',
	'col-start-4',
	'col-start-5',
	'col-start-6',
	'col-start-7',
];

const CalendarEventCard = (props: EventCardProps & { trackLength: number }) => {
	const { day, span, start } = useMemo(() => getEventPosition(props), [props]);
	const [bgColor, textColor, bgHoverColor, textHoverColor] =
		EVENT_COLORS[props.color];

	const coords = getCoordinatesOfEvent(
		props.startTime,
		props.endTime,
		props.trackLength,
	);

	return (
		<div
			key={`event-${props.startTime.toString()}`}
			style={{
				top: `${coords.startY}px`,
				height: `${coords.endY - coords.startY}px`,
			}}
			className="absolute left-0 w-full group !hover:h-fit">
			<a
				href="#"
				className={clsx(
					'transition-all duration-150 flex flex-col px-2 hover:py-2 my-auto overflow-y-auto text-sm leading-5',
					'border-2 border-white shadow hover:shadow-xl hover:py-4 bg-opacity-50 hover:z-40 hover:relative',
					'backdrop-blur-sm rounded-xl group',
					bgColor,
					textColor,
					bgHoverColor,
					textHoverColor,
				)}>
				<p
					className={clsx(
						`order-1 capitalize font-semibold`,
						textColor,
						textHoverColor,
					)}>
					{props.title}
				</p>
				<p
					className={clsx(
						`order-2 hover:flex hidden`,
						textColor,
						textHoverColor,
					)}>
					{props.description}
				</p>
				<p
					className={clsx('uppercase line-clamp-1', textColor, textHoverColor)}>
					<time dateTime={props.startTime.toString()}>
						{formatTime(props.startTime)}
					</time>{' '}
					-{' '}
					<time dateTime={props.endTime.toString()}>
						{formatTime(props.endTime)}
					</time>
				</p>
			</a>
		</div>
	);
};

export default CalendarEventCard;
