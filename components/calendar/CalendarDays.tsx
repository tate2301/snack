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
		<>
			<div className="flex items-center justify-center">
				<p className="text-sm text-center uppercase">
					GMT {new Date().getTimezoneOffset() / 60}
				</p>
			</div>
			{props.week.map((day, weekIdx) => (
				<button
					key={`week-day-${weekIdx}`}
					onClick={() => props.selectDate(day)}
					type="button"
					className={clsx(
						'flex flex-col items-center py-2 gap-px text-zinc-500 uppercase rounded-xl',
						isEqual(activeDay, day) && 'bg-white text-zinc-900 px-2 shadow-lg',
					)}>
					<span>{format(day, 'EEE')}</span>
					<span
						className={clsx(
							'flex items-start justify-center font-semibold py-0.5 rounded-lg',
						)}>
						{format(day, 'dd')}, {format(day, 'MMM')}
					</span>
				</button>
			))}
		</>
	);
};

export default CalendarDays;
