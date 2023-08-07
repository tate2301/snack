import clsx from 'clsx';
import { format, isEqual, startOfToday } from 'date-fns';
import { CalendarView, DayCalendarProps } from './types';

const CalendarDays = (props: DayCalendarProps & { view: CalendarView }) => {
	return (
		<div
			className={clsx(
				'hidden grid-cols-7 -mr-px text-sm leading-6 border-gray-100 divide-gray-100 text-zinc-500 sm:grid',
				props.view === CalendarView.Day && 'w-full',
				props.view === CalendarView.Week && 'divide-x border-r',
			)}>
			<div className={clsx('w-24 col-end-1 border-r border-zinc-100')} />
			{props.week.map((day, weekIdx) => (
				<button
					key={`week-day-${weekIdx}`}
					type="button"
					className={clsx(
						'flex flex-col items-center py-2 text-gray-500',
						weekIdx === 0 && '!border-white',
					)}>
					<span>{format(day, 'EEE')}</span>
					<span
						className={clsx(
							'flex items-start justify-center font-semibold p-1 rounded-lg',
							isEqual(startOfToday(), day) && 'bg-orange-600 text-white px-2',
						)}>
						{format(day, 'dd')}
					</span>
				</button>
			))}
		</div>
	);
};

export default CalendarDays;
