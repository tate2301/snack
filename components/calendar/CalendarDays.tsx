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
				<p className="uppercase">GMT</p>
			</div>
			{props.week.map((day, weekIdx) => (
				<button
					key={`week-day-${weekIdx}`}
					onClick={() => props.selectDate(day)}
					type="button"
					className={clsx(
						'flex flex-col items-center py-2 gap-px text-gray-500 uppercase',
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
		</>
	);
};

export default CalendarDays;
