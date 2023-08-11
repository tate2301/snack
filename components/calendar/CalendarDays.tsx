import clsx from 'clsx';
import { format, isEqual, startOfToday } from 'date-fns';
import { CalendarView, DayCalendarProps } from './types';

const CalendarDays = (
	props: DayCalendarProps & {
		view: CalendarView;
	},
) => {
	const activeDay = props.selectedDate;

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
						'flex flex-col items-center py-2 gap-px transition-all rounded-xl',
						isEqual(activeDay, day)
							? 'bg-white text-surface-12 px-2 shadow-lg'
							: 'text-surface-9',
					)}>
					<span className="text-sm uppercase">{format(day, 'EEE')}</span>
					<span
						className={clsx(
							'flex items-start justify-center font-semibold p-0.5 rounded-xl text-lg',
							isEqual(activeDay, day) && 'text-surface-12',
						)}>
						{format(day, 'dd')}
					</span>
				</button>
			))}
		</>
	);
};

export default CalendarDays;
