import CalendarLayout from '../../layouts/CalendarLayout';
import PageHeader from '../../components/navigation/Header';
import Calendar from './components';
import { CalendarView } from './components/types';
import { useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import useCalendarDates from '../../lib/hooks/useCalendarDates';
import { format, startOfToday } from 'date-fns';

export default function CalendarPage() {
	const [calendarView, setCalendarView] = useState<CalendarView>(
		CalendarView.Week,
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


	return(
		<CalendarLayout>
			<PageHeader title={format(selectedDate, "MMMM yyyy")} actions={<CalendarHeader
				view={calendarView}
				setView={setCalendarView}
				selectDate={selectDate}
				selectedDate={selectedDate}
				next={next}
				prev={prev}
			/>}/>
			<Calendar week={week} selectedDate={selectedDate} selectDate={selectDate} view={calendarView} />

		</CalendarLayout>
	)
}