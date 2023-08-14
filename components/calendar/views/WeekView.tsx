import { CalendarView, WeekCalendarProps } from '../types';
import useCalendarTime from '../../../hooks/useCalendarTime';
import Timezone from '../canvas/Timezone';
import CalendarDays from '../CalendarDays';
import DroppableDays from '../events/DroppableDays';
import AllDayEvent from '../events/AllDayEvent';
import DroppableCalendarContext from '../events/DroppableCalendarContext';
import { onlyAlldayEvents, onlyNonAlldayEvents } from '../events/utils';

export default function WeekView(props: WeekCalendarProps) {
	const { container, containerNav, timeIntervals } = useCalendarTime();

	return (
		<div
			ref={container}
			className="flex flex-col flex-auto h-full overflow-auto bg-white">
			<div
				ref={containerNav}
				className="sticky top-0 z-20 grid flex-1 p-2 mx-2 mb-2 border bg-zinc-900 bg-opacity-10 rounded-xl border-zinc-200 backdrop-blur"
				style={{
					gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
				}}>
				<CalendarDays
					week={props.week}
					selectedDate={props.selectedDate}
					view={CalendarView.Week}
					selectDate={props.selectDate}
					createEvent={props.createEvent}
					updateEvent={props.updateEvent}
					events={props.events}
				/>
			</div>
			<DroppableCalendarContext
				containerRef={container}
				createEvent={props.createEvent}
				updateEvent={props.updateEvent}
				events={props.events}
				week={props.week}>
				{({ daysContainerRef }) => (
					<div className="w-full px-2 border-zinc-200 ">
						<div>
							<AllDayEvent
								week={props.week}
								createEvent={props.createEvent}
								updateEvent={props.updateEvent}
								events={onlyAlldayEvents(props.events)}
							/>
						</div>
						<div
							className="grid flex-1 overflow-hidden divide-x"
							style={{
								gridTemplateColumns: '7rem repeat(7, minmax(6rem, 1fr))',
							}}>
							<Timezone
								zone="est"
								timeIntervals={timeIntervals}
							/>
							<DroppableDays
								view={CalendarView.Week}
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
