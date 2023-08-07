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

export default function WeekView(props: WeekCalendarProps) {
	const { container, containerNav, timeIntervals, timePosition, currentTime } =
		useCalendarTime();

	return (
		<div
			ref={container}
			className="flex flex-col flex-auto overflow-auto ">
			<div
				style={{ width: '165%' }}
				className="flex flex-col flex-none max-w-full bg-white sm:max-w-none md:max-w-full">
				<div
					ref={containerNav}
					className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
					<div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden"></div>

					<CalendarDays
						week={props.week}
						selectedDate={props.selectedDate}
						view={CalendarView.Week}
						selectDate={props.selectDate}
					/>
				</div>
				<div className="relative flex flex-auto">
					<Timestamp position={timePosition} />
					<Timezone
						zone="est"
						currentTime={currentTime}
						timeIntervals={timeIntervals}
					/>

					{/* Horizontal lines background */}
					<div className="grid flex-auto grid-cols-1 grid-rows-1">
						<>
							<CalendarHorizontalLines
								currentTime={currentTime}
								timeIntervals={timeIntervals}
							/>
							<CalendarVerticalLines
								numberOfDaysToDisplay={props.daysToDisplay}
							/>
						</>

						{/* Events */}
						<CalendarEvents view={CalendarView.Week} />
					</div>
				</div>
			</div>
		</div>
	);
}
