import { useState, useEffect, memo } from 'react';
import { CalendarView } from './types';
import WeekView from './views/WeekView';
import CalendarHeader from './CalendarHeader';
import { AnimatePresence } from 'framer-motion';
import DayView from './views/DayView';
import { add, startOfToday } from 'date-fns';
import useCalendarDates from '../../../lib/hooks/useCalendarDates';
import { EventCardProps } from './events/EventCard';
import { generateEventDescription, generateEventTitle, getRandomColorForEvent } from './events/utils';
import { generateUUID } from '../../../lib/functions';

const Calendar = (props: {
	selectedDate: Date;
	minimal?: boolean
	view: CalendarView;
	week: Date[];
	selectDate: (date: Date) => void;
}) => {

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

	return (
		<div className={'flex-1 h-full w-full flex flex-col'}>
			<div className="flex flex-col justify-between w-full h-full px-2 pb-0 overflow-hidden rounded-xl border-zinc-400/10">

				<AnimatePresence>
					{props.view === CalendarView.Day && (
						<DayView
							minimal={props.minimal}
							week={props.week}
							selectedDate={props.selectedDate}
							selectDate={props.selectDate}
							events={events}
							createEvent={createEvent}
							updateEvent={updateEvent}
						/>
					)}
					{props.view === CalendarView.Week && (
						<WeekView
							selectedDate={props.selectedDate}
							week={props.week}
							daysToDisplay={7}
							selectDate={props.selectDate}
							events={events}
							createEvent={createEvent}
							updateEvent={updateEvent}
						/>
					)}
					{props.view === CalendarView.Month && (
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

export default memo(Calendar);
