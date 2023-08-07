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
				next={
					props.view === CalendarView.Day
						? nextDate
						: props.view === CalendarView.Week
						? nextWeek
						: nextMonth
				}
				prev={
					props.view === CalendarView.Day
						? prevDate
						: props.view === CalendarView.Week
						? prevWeek
						: prevMonth
				}
			/>
			<AnimatePresence>
				{calendarView === CalendarView.Day && (
					<DayView
						week={week}
						selectedDate={selectedDate}
					/>
				)}
				{calendarView === CalendarView.Week && (
					<WeekView
						selectedDate={selectedDate}
						week={week}
						daysToDisplay={7}
					/>
				)}
				{calendarView === CalendarView.Month && <div>Not implemented</div>}
			</AnimatePresence>
		</div>
	);
};

export default Calendar;
