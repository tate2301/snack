import { useState } from 'react';
import { CalendarView } from './types';
import WeekView from './views/WeekView';
import CalendarHeader from './CalendarHeader';
import { AnimatePresence, motion } from 'framer-motion';
import DayView from './views/DayView';
import useCalendarDates from '../../hooks/useCalendarDates';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
	addCalendar,
	selectCalendars,
	selectEventsForSelectedCalendars,
	selectGlobalCalendar,
	selectSelectedCalendars,
	toggleCalendar,
} from '../../redux/calendar';
import { addEvent, updateEvent } from '../../redux/events';
import { SnackEvent } from '../../redux/events/types';
import ExpandSidebarIcon from '../../icons/ExpandSidebarIcon';
import CollapseSidebarIcon from '../../icons/CollapseSidebarIcon';
import { SnackCalendar } from '../../redux/calendar/types';
import { getRandomColorForEvent } from './events/utils';
import { generateUUID } from '../../lib/functions';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddNewCalendar from './CreateCalendar';

type CalendarProps = {
	view: CalendarView;
};

const Calendar = (props: CalendarProps) => {
	const dispatch = useAppDispatch();
	const globalCalendar = useAppSelector(selectGlobalCalendar);
	const events = useAppSelector((state) =>
		selectEventsForSelectedCalendars(state, false),
	);

	const [calendarView, setCalendarView] = useState<CalendarView>(
		globalCalendar.preferences.view,
	);

	const onToggleCalendar = () => dispatch(toggleCalendar(null));

	const onCreateEvent = (event: SnackEvent) => {
		dispatch(addEvent(event));
	};

	const onUpdateEvent = (event: SnackEvent) => {
		dispatch(updateEvent(event));
	};

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
	} = useCalendarDates(globalCalendar.selectedDate);

	const { isOver, setNodeRef } = useDroppable({
		id: 'calendar',
		data: {
			view: calendarView,
			selectedDate: selectedDate,
		},
	});

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
			className={clsx(
				'h-full flex justify-end m-2 pb-4 gap-4 items-end',
				globalCalendar.preferences.expanded && 'flex-1 w-full',
			)}>
			<motion.div
				animate={{
					width: globalCalendar.preferences.expanded ? '100%' : 0,
				}}
				ref={setNodeRef}
				className={clsx(
					'flex relative h-full w-full pb-0 overflow-hidden bg-white rounded-xl',
					globalCalendar.preferences.expanded && 'shadow',
				)}>
				{isOver && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={
							'absolute top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-20 z-[30]'
						}></motion.div>
				)}

				{globalCalendar.preferences.expanded && (
					<div className="flex flex-col relative justify-between w-full flex-1 h-full">
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
									createEvent={onCreateEvent}
									updateEvent={onUpdateEvent}
								/>
							)}
							{calendarView === CalendarView.Week && (
								<WeekView
									selectedDate={selectedDate}
									week={week}
									daysToDisplay={7}
									selectDate={selectDate}
									events={events}
									createEvent={onCreateEvent}
									updateEvent={onUpdateEvent}
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
				)}
			</motion.div>
			<div className="p-2 justify-start items-center flex h-full flex-col gap-8 rounded-xl bg-white ">
				<button
					onClick={onToggleCalendar}
					className="p-2 rounded-xl hover:bg-surface-4 text-surface-10 hover:text-surface-12">
					{globalCalendar.preferences.expanded ? (
						<CollapseSidebarIcon className="w-6 h-6" />
					) : (
						<ExpandSidebarIcon className="w-6 h-6" />
					)}
				</button>
				<CalendarsList />
			</div>
		</div>
	);
};

function CalendarsList() {
	const dispatch = useAppDispatch();
	const calendars = useAppSelector(selectCalendars);

	const onCreateCalendar = (title: string) => {
		const calendar: SnackCalendar = {
			color: getRandomColorForEvent(),
			createdAt: new Date(),
			lastUpdated: new Date(),
			events: [],
			id: generateUUID(),
			tasks: [],
			title,
		};

		dispatch(addCalendar(calendar));
	};
	return (
		<div className="flex flex-col gap-2 items-center mt-8">
			<div>
				{calendars.map((calendar) => (
					<div
						key={calendar.id}
						className="flex flex-col items-center">
						<button className="flex items-center border-2 border-primary-10 justify-center gap-4 p-2 font-semibold text-surface-12 text-xl rounded-xl hover:bg-surface-3">
							{calendar.emoji}
						</button>
					</div>
				))}
			</div>

			<AddNewCalendar onCreateCalendar={onCreateCalendar} />
		</div>
	);
}

export default Calendar;
