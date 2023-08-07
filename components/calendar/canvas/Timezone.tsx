import clsx from 'clsx';
import { CalendarDayTimeProps } from '../types';
import { differenceInMinutes, format, getTime } from 'date-fns';

const getTimeString = (time: Date) =>
	Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: 'numeric',
	}).format(time);

const Timezone = (props: { zone: string } & CalendarDayTimeProps) => {
	return (
		<div
			className={clsx(
				'sticky left-0 z-10 flex-none w-24 bg-white border-r border-zinc-100 px-4',
				'grid col-start-1 col-end-2 row-start-1 uppercase',
			)}
			style={{ gridTemplateRows: 'repeat(48, minmax(4rem))' }}>
			<div />
			{props.timeIntervals.map((time, idx) => (
				<>
					<div key={`time-${idx}`}>
						<div className="sticky left-0 z-20 -mt-2.5 w-full text-right text-xs leading-5 text-gray-400">
							{Math.abs(differenceInMinutes(props.currentTime, time)) < 10
								? ''
								: getTimeString(time)}
						</div>
					</div>
					<div />
				</>
			))}
		</div>
	);
};

export default Timezone;
