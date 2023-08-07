import { useState } from 'react';
import { CalendarView } from './types';
import WeekView from './views/WeekView';
import CalendarHeader from './CalendarHeader';
import { AnimatePresence } from 'framer-motion';
import DayView from './views/DayView';
import { startOfToday } from 'date-fns';
import useCalendarDates from '../../hooks/useCalendarDates';

type CalendarProps = {
	view: CalendarView;
};

const Calendar = (props: CalendarProps) => {
	const [calendarView, setCalendarView] = useState<CalendarView>(
		props.view ?? CalendarView.Week,
	);
	const {
		week,
		nextWeek,
		prevWeek,
		selectDate,
		selectedDate,
		nextMonth,
		prevMonth,
		nextDate,
		prevDate,
	} = useCalendarDates(startOfToday());

	const next = () => {
		if (calendarView === CalendarView.Day) {
			nextDate();
		} else if (calendarView === CalendarView.Week) {
			nextWeek();
		} else if (calendarView === CalendarView.Month) {
			nextMonth();
		}
	};

	const prev = () => {
		if (calendarView === CalendarView.Day) {
			prevDate();
		} else if (calendarView === CalendarView.Week) {
			prevWeek();
		} else if (calendarView === CalendarView.Month) {
			prevMonth();
		}
	};

	return (
		<div
			className={
				'flex-1 flex flex-col justify-between h-full bg-stone-50 border-zinc-200 w-full overflow-clip'
			}>
			<CalendarHeader
				view={calendarView}
				setView={setCalendarView}
				selectDate={selectDate}
				selectedDate={selectedDate}
				next={next}
				prev={prev}
			/>
			<AnimatePresence>
				{calendarView === CalendarView.Day && (
					<DayView
						week={week}
						selectedDate={selectedDate}
						selectDate={selectDate}
					/>
				)}
				{calendarView === CalendarView.Week && (
					<WeekView
						selectedDate={selectedDate}
						week={week}
						daysToDisplay={7}
						selectDate={selectDate}
					/>
				)}
				{calendarView === CalendarView.Month && <div>Not implemented</div>}
			</AnimatePresence>
		</div>
	);
};

export default Calendar;
