import useCalendarTime from '../../../hooks/useCalendarTime';
import { format, isEqual, startOfDay, startOfToday } from 'date-fns';
import Timestamp from '../canvas/Timestamp';
import Timezone from '../canvas/Timezone';
import { CalendarView, DayCalendarProps } from '../types';
import clsx from 'clsx';
import EventsTrack from '../events/Track';
import DroppableCalendarContext from '../events/DroppableCalendarContext';
import { getDayHourlyInterval } from '../events/utils';
import DroppableColumn from '../events/DroppableColumn';

export default function DayView(props: DayCalendarProps) {
	const { container, containerNav, timeIntervals } = useCalendarTime();

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
				createEvent={props.createEvent}
				updateEvent={props.updateEvent}
				events={props.events}
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
									view={CalendarView.Day}
									createEvent={props.createEvent}
									events={props.events.filter(
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
									updateEvent={props.updateEvent}
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
