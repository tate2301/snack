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
	selectEventsForSelectedCalendars,
	selectGlobalCalendar,
	selectSelectedCalendars,
	toggleCalendar,
} from '../../redux/calendar';
import { addEvent, updateEvent } from '../../redux/events';
import { SnackEvent } from '../../redux/events/types';
import ExpandSidebarIcon from '../../icons/ExpandSidebarIcon';

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
				'h-full flex flex-col m-2 pb-4 items-end',
				globalCalendar.preferences.expanded && 'flex-1 w-full',
			)}>
			<motion.div
				animate={{
					width: globalCalendar.preferences.expanded ? '100%' : '40px',
				}}
				ref={setNodeRef}
				className={clsx(
					'flex flex-col relative justify-between w-full h-full pb-0 overflow-hidden bg-white rounded-xl',
					globalCalendar.preferences.expanded && 'shadow',
				)}>
				<AnimatePresence>
					{isOver && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={
								'absolute top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-20 z-[30]'
							}></motion.div>
					)}
					<div className="p-2 justify-end flex">
						<motion.button
							onClick={onToggleCalendar}
							layoutId="calendarSnap"
							className="p-2 rounded-lg hover:bg-surface-4 text-surface-10 hover:text-surface-12">
							<ExpandSidebarIcon className="w-6 h-6" />
						</motion.button>
					</div>
					{globalCalendar.preferences.expanded && (
						<>
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
						</>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

export default Calendar;
