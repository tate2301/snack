import clsx from 'clsx';
import { CalendarDayTimeProps } from '../types';

const getTimeString = (time: Date, isMinimal?: boolean) => isMinimal ?
	Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		hour12: false
	}).format(time) : Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: 'numeric',
	}).format(time);

const Timezone = (props: { zone: string } & CalendarDayTimeProps) => {
	return (
		<div
			className={clsx(
				'sticky left-0 z-10 flex-none px-4',
				'grid col-start-1 col-end-2 row-start-1 uppercase',
			)}
			style={{ gridTemplateRows: `repeat(48, minmax(4rem))` }}>
			{props.timeIntervals.map((time, idx) => (
				<>
					<div
						className="h-[80px]"
						key={`time-${idx}`}>
						<div className="sticky left-0 z-20 -mt-2.5 w-full text-right text-xs leading-5 text-gray-400">
							{idx === 0 ? '' : getTimeString(time, props.minimal)}
						</div>
					</div>
				</>
			))}
		</div>
	);
};

export default Timezone;
