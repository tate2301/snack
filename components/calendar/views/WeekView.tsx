import { CalendarView, WeekCalendarProps } from '../types';
import useCalendarTime from '../../../hooks/useCalendarTime';
import Timezone from '../canvas/Timezone';
import CalendarDays from '../CalendarDays';
import DroppableDays from '../events/DroppableDays';

export default function WeekView(props: WeekCalendarProps) {
	const { container, containerNav, timeIntervals } = useCalendarTime();
	return (
		<div
			ref={container}
			className="flex flex-col flex-auto h-full overflow-auto bg-white">
			<div
				ref={containerNav}
				className="sticky top-0 z-30 grid flex-1 p-2 mx-2 mb-2 border bg-zinc-900 bg-opacity-10 rounded-xl border-zinc-200 backdrop-blur"
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
			<div className="w-full border-t border-b border-zinc-200">
				<div>
					<AllDayEvent />
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
					/>
				</div>
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
			<p className="py-2 pt-4 text-xs text-center">All Day</p>
			{[...Array(7)].map((_, index) => (
				<div
					className="flex flex-col items-center justify-center p-2 pt-4 hover:bg-zinc-100"
					key={`week-day-${index}`}></div>
			))}
		</div>
	);
}
