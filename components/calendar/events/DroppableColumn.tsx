import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { add } from 'date-fns';
import { eachMinuteOfIntervalWithOptions } from 'date-fns/fp';
import { useMemo, useRef } from 'react';
import { generateUUID } from '../../../lib/functions';

const DroppableColumn = (props: { idx: number; time: Date }) => {
	const fiveMinuteIntervalsForHour = useMemo(() => {
		return eachMinuteOfIntervalWithOptions(
			{
				step: 15,
			},
			{
				start: props.time,
				end: add(props.time, { minutes: 55 }),
			},
		);
	}, [props.time]);

	return (
		<div className={clsx('h-[80px]', props.idx === 0 && '!border-t-0')}>
			{fiveMinuteIntervalsForHour.map((time, idx) => (
				<DroppableTimeSlot
					time={time}
					key={time.getTime()}
				/>
			))}
		</div>
	);
};

const DroppableTimeSlot = (props: { time: Date }) => {
	const id = useRef(generateUUID());
	const { setNodeRef } = useDroppable({
		id: id.current,
		data: {
			type: 'droppableDay',
			time: props.time,
		},
	});

	return (
		<div
			style={{
				height: `calc(100% / 4)`,
			}}
			ref={setNodeRef}
			className={clsx('hover:bg-zinc-100')}
		/>
	);
};

export default DroppableColumn;
