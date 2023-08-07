import clsx from 'clsx';
import { format, isEqual, startOfToday } from 'date-fns';
import { CalendarView, DayCalendarProps } from './types';

const CalendarDays = (
	props: DayCalendarProps & {
		view: CalendarView;
	},
) => {
	const activeDay =
		props.view === CalendarView.Day ? props.selectedDate : startOfToday();

	return (
		<div
			className={clsx(
				'hidden grid-cols-7 -mr-px text-sm leading-6 border-gray-100 divide-gray-100 text-zinc-500 sm:grid ',
				props.view === CalendarView.Day && 'w-full',
				props.view === CalendarView.Week && 'divide-x border-r',
			)}>
			<div className={clsx('w-24 col-end-1 border-r border-zinc-100')} />
			{props.week.map((day, weekIdx) => (
				<button
					key={`week-day-${weekIdx}`}
					onClick={() => props.selectDate(day)}
					type="button"
					className={clsx(
						'flex flex-col items-center py-2 gap-px text-gray-500 uppercase',
						weekIdx === 0 && '!border-white',
					)}>
					<span>{format(day, 'EEE')}</span>
					<span
						className={clsx(
							'flex items-start justify-center font-semibold py-0.5 rounded-lg',
							isEqual(activeDay, day) && 'bg-orange-600 text-white px-2',
						)}>
						{format(day, 'dd')}
					</span>
				</button>
			))}
		</div>
	);
};

export default CalendarDays;
