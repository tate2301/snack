import { Collision, useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { add } from 'date-fns';
import { eachMinuteOfIntervalWithOptions } from 'date-fns/fp';
import { useMemo, useEffect, useRef, useState } from 'react';
import { generateUUID } from '../../../lib/functions';

const DroppableColumn = (props: {
	idx: number;
	time: Date;
	collisions: Collision[];
}) => {
	const fiveMinuteIntervalsForHour = useMemo(() => {
		return eachMinuteOfIntervalWithOptions(
			{
				step: 5,
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
					collisions={props.collisions}
				/>
			))}
		</div>
	);
};

const DroppableTimeSlot = (props: { time: Date; collisions: Collision[] }) => {
	const id = useRef(generateUUID());
	const [isColliding, setIsColliding] = useState(false);
	const { setNodeRef } = useDroppable({
		id: id.current,
	});

	useEffect(() => {
		setIsColliding(props.collisions.some((c) => c.id === id.current));
	}, [props.collisions]);

	return (
		<div
			style={{
				height: `calc(100% / 12)`,
			}}
			ref={setNodeRef}
			className={clsx('hover:bg-zinc-100', isColliding && 'bg-purple-50')}
		/>
	);
};

export default DroppableColumn;
