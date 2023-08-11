import { useState, useEffect } from 'react';
import { CalendarView } from './types';
import WeekView from './views/WeekView';
import CalendarHeader from './CalendarHeader';
import { AnimatePresence } from 'framer-motion';
import DayView from './views/DayView';
import { add, startOfToday } from 'date-fns';
import useCalendarDates from '../../hooks/useCalendarDates';
import { EventCardProps } from './events/EventCard';
import {
	generateEventDescription,
	generateEventTitle,
	getRandomColorForEvent,
} from './events/utils';
import { generateUUID } from '../../lib/functions';

type CalendarProps = {
	view: CalendarView;
};

const Calendar = (props: CalendarProps) => {
	const [calendarView, setCalendarView] = useState<CalendarView>(
		props.view ?? CalendarView.Week,
	);

	const [events, setEvents] = useState<EventCardProps[]>([]);
	const updateEvent = (event: EventCardProps) => {
		setEvents((events) => {
			const index = events.findIndex((e) => e.id === event.id);
			const newEvents = [...events];
			newEvents[index] = event;
			return newEvents;
		});
	};

	const createEvent = (event: EventCardProps) => {
		setEvents((events) => [...events, event]);
	};

	useEffect(() => {
		setEvents([
			{
				color: getRandomColorForEvent(),
				description: generateEventDescription(),
				title: generateEventTitle(),
				location: '',
				startTime: add(startOfToday(), { hours: 1, minutes: 30 }),
				endTime: add(startOfToday(), { hours: 2, minutes: 0 }),
				id: generateUUID(),
			},
		]);
	}, []);

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
		<div className={'flex-1 h-full w-full flex flex-col'}>
			<div className="flex flex-col justify-between w-full h-full p-2 pb-0 overflow-hidden bg-white border-l border-zinc-200">
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
							events={events}
							createEvent={createEvent}
							updateEvent={updateEvent}
						/>
					)}
					{calendarView === CalendarView.Week && (
						<WeekView
							selectedDate={selectedDate}
							week={week}
							daysToDisplay={7}
							selectDate={selectDate}
							events={events}
							createEvent={createEvent}
							updateEvent={updateEvent}
						/>
					)}
					{calendarView === CalendarView.Month && (
						<div className="flex items-center justify-center w-full h-full">
							<button className="p-4 uppercase transition-all bg-danger-4 text-danger-11 hover:text-white hover:bg-danger-10 rounded-xl">
								Not implemented
							</button>
						</div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Calendar;
