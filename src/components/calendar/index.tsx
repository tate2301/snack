import { useState, useEffect } from 'react';
import { CalendarView } from './types';
import WeekView from './views/WeekView';
import CalendarHeader from './CalendarHeader';
import { AnimatePresence } from 'framer-motion';
import DayView from './views/DayView';
import { startOfToday } from 'date-fns';
import useCalendarDates from '../../hooks/useCalendarDates';

const Calendar = (props: {
	selectedDate: Date;
	view: CalendarView;
	week: Date[];
	selectDate: (date: Date) => void;
}) => {

	return (
		<div className={'flex-1 h-full w-full flex flex-col'}>
			<div className="flex flex-col justify-between w-full h-full px-2 pb-0 overflow-hidden bg-white shadow rounded-xl border-zinc-400/10">

				<AnimatePresence>
					{props.view === CalendarView.Day && (
						<DayView
							week={props.week}
							selectedDate={props.selectedDate}
							selectDate={props.selectDate}
						/>
					)}
					{props.view === CalendarView.Week && (
						<WeekView
							selectedDate={props.selectedDate}
							week={props.week}
							daysToDisplay={7}
							selectDate={props.selectDate}
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

export default Calendar;
