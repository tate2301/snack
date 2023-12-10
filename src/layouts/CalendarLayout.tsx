import NavigationSidebar from '../components/navigation/sidebar/Sidebar';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import clsx from 'clsx';
import CommandBar from '../components/commandbar';
import CalendarPage from '../features/calendar';
import { ReactNode, useState } from 'react';
import { CalendarView } from '../features/calendar/components/types';
import useCalendarDates from '../lib/hooks/useCalendarDates';
import { startOfToday } from 'date-fns';
import Calendar from '../features/calendar/components';

export default function CalendarLayout(props: {
	hasCalendar?: boolean;
	children: ReactNode;
}) {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const onDragEnd = (event) => {};
	return (
		<DndContext
			onDragEnd={onDragEnd}
			sensors={sensors}>
			<div
				className={clsx(
					'h-full overflow-y-auto flex-1 bg-white container mx-auto',
				)}>
				{props.children}
			</div>
		</DndContext>
	);
}

export const DailyPlanner = () => {
	const [calendarView, setCalendarView] = useState<CalendarView>(
		CalendarView.Day,
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
				'w-96 border-l border-zinc-400/10 h-screen bg-surface-2 overflow-y-auto '
			}>
			<Calendar
				minimal
				week={week}
				selectedDate={selectedDate}
				selectDate={selectDate}
				view={calendarView}
			/>
		</div>
	);
};
