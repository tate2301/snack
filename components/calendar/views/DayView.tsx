/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react';
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import CalendarHorizontalLines from '../canvas/CalendarHorizontalLines';
import useCalendarTime from '../../../hooks/useCalendarTime';
import { add, format, isEqual, startOfDay, startOfToday } from 'date-fns';
import Timestamp from '../canvas/Timestamp';
import Timezone from '../canvas/Timezone';
import CalendarDays from '../CalendarDays';
import { CalendarView, DayCalendarProps } from '../types';
import clsx from 'clsx';
import useTimestampPosition from '../../../hooks/useTimestampPosition';
import EventsTrack from '../events/Track';
import { EventCardProps } from '../events/EventCard';
import DroppableCalendarContext from '../events/DroppableCalendarContext';
import {
	generateEventDescription,
	generateEventTitle,
	getDayHourlyInterval,
	getRandomColorForEvent,
} from '../events/utils';
import { generateUUID } from '../../../lib/functions';
import DroppableColumn from '../events/DroppableColumn';

export default function DayView(props: DayCalendarProps) {
	const { container, containerNav, timeIntervals, timePosition } =
		useCalendarTime();
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
		<div
			ref={container}
			className="flex flex-col flex-auto overflow-auto">
			<div
				ref={containerNav}
				style={{
					gridTemplateColumns: '7rem repeat(1, minmax(6rem, 1fr))',
				}}
				className="sticky top-0 z-30 grid px-2 bg-white divide-x ring-1 ring-black ring-opacity-5 sm:pr-8">
				<div className="border-zinc-100" />
				<div className="flex justify-center flex-1 py-2 ">
					<button className="uppercase">
						<span>{format(props.selectedDate, 'EEE')}</span>
						<span
							className={clsx(
								'flex items-start justify-center font-semibold p-1 rounded-lg',
								isEqual(props.selectedDate, startOfToday()) &&
									'bg-orange-600 text-white px-2',
							)}>
							{format(props.selectedDate, 'dd')}
						</span>
					</button>
				</div>
			</div>
			<DroppableCalendarContext
				containerRef={container}
				createEvent={createEvent}
				updateEvent={updateEvent}
				events={events}
				week={props.week}>
				{({ daysContainerRef }) => (
					<div className="w-full px-2 border-zinc-200">
						<div
							className="grid w-full bg-white divide-x"
							style={{
								gridTemplateColumns: '7rem repeat(1, minmax(6rem, 1fr))',
							}}>
							<Timezone
								zone="est"
								timeIntervals={timeIntervals}
							/>

							<div
								ref={daysContainerRef}
								className="relative grid flex-auto grid-cols-1 grid-rows-1 divide-y">
								<Timestamp />
								<EventsTrack
									createEvent={createEvent}
									events={events.filter(
										(e) =>
											isEqual(
												startOfDay(e.startTime),
												startOfDay(props.selectedDate),
											) ||
											isEqual(
												startOfDay(e.endTime),
												startOfDay(props.selectedDate),
											),
									)}
									updateEvent={updateEvent}
									date={props.selectedDate}
								/>
								{getDayHourlyInterval(props.selectedDate).map((time, idx) => (
									<>
										<DroppableColumn
											idx={idx}
											time={time}
											key={`time-${time.toString()}`}
										/>
									</>
								))}
							</div>
						</div>
					</div>
				)}
			</DroppableCalendarContext>
		</div>
	);
}
