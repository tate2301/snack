import { useMemo } from 'react';
import { formatTime, getEventPosition } from '../../../lib/utils';
import clsx from 'clsx';
import { EVENT_COLORS } from '../../../constants/event-colors';

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

const CalendarEventCard = (props: EventCardProps) => {
	const { day, span, start } = useMemo(() => getEventPosition(props), [props]);
	const [bgColor, textColor, bgHoverColor, textHoverColor] =
		EVENT_COLORS[props.color];

	console.log({ span, start });

	return (
		<li
			className={clsx(`relative flex group`, day > 0 && cols[day - 1])}
			style={{ gridRow: `${start} / span ${span}` }}>
			<a
				href="#"
				className={clsx(
					'absolute flex flex-col p-2 overflow-y-auto text-sm leading-5',
					'border-2 border-white shadow bg-opacity-30',
					'backdrop-blur-sm rounded-xl group inset-1',
					bgColor,
					textColor,
					bgHoverColor,
					textHoverColor,
				)}>
				<p className={clsx(`order-1 font-semibold`, textColor, textHoverColor)}>
					{props.title}
				</p>
				<p className={clsx('uppercase', textColor, textHoverColor)}>
					<time dateTime={props.startTime.toString()}>
						{formatTime(props.startTime)}
					</time>{' '}
					-{' '}
					<time dateTime={props.endTime.toString()}>
						{formatTime(props.endTime)}
					</time>
				</p>
			</a>
		</li>
	);
};

export default CalendarEventCard;
