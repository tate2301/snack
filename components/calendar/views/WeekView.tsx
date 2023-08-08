import { add, format, isEqual, startOfToday } from 'date-fns';
import clsx from 'clsx';
import { CalendarView, WeekCalendarProps } from '../types';
import useCalendarTime from '../../../hooks/useCalendarTime';
import CalendarEvents from '../events';
import Timestamp from '../canvas/Timestamp';
import CalendarHorizontalLines from '../canvas/CalendarHorizontalLines';
import CalendarVerticalLines from '../canvas/CalendarVerticalLines';
import Timezone from '../canvas/Timezone';
import CalendarDays from '../CalendarDays';
import useTimestampPosition from '../../../hooks/useTimestampPosition';
import EventsTrack from '../events/Track';
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useDroppable,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState, ReactNode } from 'react';
import { EventCardProps } from '../events/EventCard';
import {
	convertCoordinatesToTime,
	generateEventDescription,
	generateEventTitle,
	getRandomColorForEvent,
} from '../events/utils';
import { generateUUID } from '../../../lib/functions';
import DroppableColumn from '../events/DroppableColumn';
import DroppableDays from '../events/DroppableDays';

export default function WeekView(props: WeekCalendarProps) {
	const { container, containerNav, timeIntervals, timePosition, currentTime } =
		useCalendarTime();

	return (
		<div
			ref={container}
			className="flex flex-col flex-auto h-full overflow-auto bg-white">
			<div
				ref={containerNav}
				className="sticky top-0 z-30 grid flex-1 bg-white border-b divide-x border-zinc-200"
				style={{
					gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
				}}>
				<CalendarDays
					week={props.week}
					selectedDate={props.selectedDate}
					view={CalendarView.Week}
					selectDate={props.selectDate}
				/>
			</div>
			<AllDayEvent />
			<div
				className="grid flex-1 divide-x"
				style={{
					gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
				}}>
				<Timezone
					zone="est"
					currentTime={currentTime}
					timeIntervals={timeIntervals}
				/>
				<DroppableDays
					timeIntervals={timeIntervals}
					week={props.week}
				/>
			</div>
		</div>
	);
}

function AllDayEvent() {
	return (
		<div
			className="grid uppercase border-b divide-x"
			style={{
				gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
			}}>
			<p className="py-2 text-xs text-center">All Day</p>
			{[...Array(7)].map((_, index) => (
				<div
					className="flex flex-col items-center justify-center p-2 hover:bg-zinc-100"
					key={`week-day-${index}`}></div>
			))}
		</div>
	);
}
