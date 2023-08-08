import { format, isEqual, startOfToday } from 'date-fns';
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

export default function WeekView(props: WeekCalendarProps) {
	const { container, containerNav, timeIntervals, timePosition, currentTime } =
		useCalendarTime();
	const timestampPosition = useTimestampPosition();

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
				{props.week.map((day, index) => (
					<div
						className="relative divide-y "
						key={day.toString()}>
						{isEqual(day, startOfToday()) && (
							<Timestamp position={timestampPosition} />
						)}
						<EventsTrack date={day} />
						{timeIntervals.map((time, idx) => (
							<>
								<div
									className={clsx(
										'h-[80px] hover:bg-zinc-100',
										idx === 0 && '!border-t-0',
									)}
									key={`time-${time.toString()}`}></div>
							</>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
/*
<div className="relative flex flex-auto">
	<Timestamp position={timePosition} />

	<div className="grid flex-auto grid-cols-1 grid-rows-1">
		<>
			<CalendarHorizontalLines
				currentTime={currentTime}
				timeIntervals={timeIntervals}
			/>
			<CalendarVerticalLines numberOfDaysToDisplay={props.daysToDisplay} />
		</>

		<CalendarEvents view={CalendarView.Week} />
	</div>
</div>; 
*/

function AllDayEvent({}) {
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
