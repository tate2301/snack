import { useState, useEffect, MutableRefObject } from 'react';
import { Collision } from '@dnd-kit/core';
import { startOfToday } from 'date-fns';
import { convertCoordinatesToTimeRounded } from '../events/utils';

const NewEventStartTime = (props: {
	topCollision: Collision;
	containerRef: MutableRefObject<HTMLDivElement>;
}) => {
	const [timestampPosition, setTimestampPosition] = useState(0);
	const [newStartTime, setNewStartTime] = useState(startOfToday());

	useEffect(() => {
		const parentOffset = props.containerRef.current?.offsetTop ?? 0;
		const yTop = props.topCollision.data.droppableContainer.top;

		const time = convertCoordinatesToTimeRounded(yTop - parentOffset, 80 * 24);
		setNewStartTime(time);
		setTimestampPosition(yTop);
	}, [props]);

	return (
		<>
			{props.containerRef.current && (
				<div
					className="absolute left-0 w-full flex justify-between items-center transition-transform duration-700 delay-300 !border-none z-50"
					style={{ top: `${timestampPosition}px` }}>
					<p className="p-2 w-[7rem] rounded bg-white uppercase">
						{Intl.DateTimeFormat('en-us', {
							hour: '2-digit',
							minute: '2-digit',
						}).format(newStartTime)}
					</p>
					<p className="flex-1 h-[2px] bg-zinc-900" />
				</div>
			)}
		</>
	);
};

export default NewEventStartTime;
