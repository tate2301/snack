import { CalendarView, WeekCalendarProps } from '../types';
import useCalendarTime from '../../../../lib/hooks/useCalendarTime';
import Timezone from '../canvas/Timezone';
import CalendarDays from '../CalendarDays';
import DroppableDays from '../events/DroppableDays';
import AllDayEvent from '../events/AllDayEvent';
import DroppableCalendarContext from '../events/DroppableCalendarContext';
import { EventCardProps } from '../events/EventCard';
import { useEffect, useState } from 'react';
import {
	generateEventDescription,
	generateEventTitle,
	getRandomColorForEvent,
	onlyAlldayEvents,
	onlyNonAlldayEvents,
} from '../events/utils';
import { add, startOfToday } from 'date-fns';
import { generateUUID } from '../../../../lib/functions';

export default function WeekView(props: WeekCalendarProps) {
	const { container, containerNav, timeIntervals } = useCalendarTime();


	return (
		<div
			ref={container}
			className="flex flex-col flex-auto h-full overflow-auto bg-white">
			<div
				ref={containerNav}
				className="sticky top-0 z-30 grid flex-1 p-2 mb-0 border-b border-zinc-400/10 bg-white"
				style={{
					gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
				}}>
				<CalendarDays
					week={props.week}
					selectedDate={props.selectedDate}
					view={CalendarView.Week}
					selectDate={props.selectDate}
					events={props.events}
					createEvent={props.createEvent}
					updateEvent={props.updateEvent}
				/>
			</div>
			<DroppableCalendarContext
				containerRef={container}
				createEvent={props.createEvent}
				updateEvent={props.updateEvent}
				events={props.events}
				week={props.week}>
				{({ daysContainerRef }) => (
					<div className="w-full px-2 border-zinc-400/10">
						<div>
							<AllDayEvent
								week={props.week}
								createEvent={props.createEvent}
								updateEvent={props.updateEvent}
								events={onlyAlldayEvents(props.events)}
							/>
						</div>
						<div
							className="grid flex-1 divide-x"
							style={{
								gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
							}}>
							<Timezone
								zone="est"
								timeIntervals={timeIntervals}
							/>
							<DroppableDays
								week={props.week}
								containerRef={container}
								createEvent={props.createEvent}
								updateEvent={props.updateEvent}
								events={onlyNonAlldayEvents(props.events)}
								daysContainerRef={daysContainerRef}
							/>
						</div>
					</div>
				)}
			</DroppableCalendarContext>
		</div>
	);
}
