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
						'flex justify-center items-center py-1 gap-1 text-zinc-500 rounded-xl !font-normal',
						isEqual(activeDay, day) && 'text-surface-12 px-2',
					)}>
					<span>{format(day, 'EEE')}</span>
					<span
						className={clsx(
							'flex items-start justify-center font-semibold px-1 rounded-lg',
							isEqual(activeDay, day) && 'text-surface-1 bg-primary-10 px-1')}>
						{format(day, 'dd')}
					</span>
				</button>
			))}
		</>
	);
};

export default CalendarDays;
