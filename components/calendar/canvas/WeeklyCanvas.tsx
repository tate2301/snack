import { isEqual, startOfToday } from 'date-fns';
import DroppableColumn from '../events/DroppableColumn';
import Timestamp from './Timestamp';
import clsx from 'clsx';
import { Collision } from '@dnd-kit/core';

export default function WeeklyCanvas(props: {
	week: Date[];
	timeIntervals: Date[];
	collisions: Collision[];
}) {
	return (
		<>
			{props.week.map((day, index) => (
				<div className={clsx('relative divide-y')}>
					{isEqual(day, startOfToday()) && <Timestamp />}

					{props.timeIntervals.map((time, idx) => (
						<>
							<DroppableColumn
								idx={idx}
								time={time}
								key={`time-${time.toString()}`}
								collisions={props.collisions}
							/>
						</>
					))}
				</div>
			))}
		</>
	);
}
