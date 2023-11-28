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

export default function CalendarLayout(props:{
	hasCalendar?: boolean
	children: ReactNode
}) {

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);
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

	const onDragEnd = (event) => {};
	return (
		<DndContext
			onDragEnd={onDragEnd}
			sensors={sensors}>
			{false && <CommandBar />}{' '}
			<div className="relative flex flex-col w-screen h-screen overflow-hidden">
				<div
					className={
						'w-full flex flex-1 items-start h-[calc(100vh-2.5rem)] justify-between'
					}>
					<NavigationSidebar />
					<div
						className={clsx(
							'h-full overflow-y-auto flex-1 bg-white',
						)}>
						{props.children}
					</div>
					{props.hasCalendar && <div className={'w-96 border-l border-zinc-400/10 h-screen overflow-y-auto bg-surface-2'}>
						<Calendar minimal week={week} selectedDate={selectedDate} selectDate={selectDate} view={calendarView} />
					</div>}
				</div>
			</div>
		</DndContext>
	);
}
