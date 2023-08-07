/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef } from 'react';
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import CalendarHorizontalLines from '../canvas/CalendarHorizontalLines';
import useCalendarTime from '../../../hooks/useCalendarTime';
import { format, isEqual, startOfToday } from 'date-fns';
import Timestamp from '../canvas/Timestamp';
import Timezone from '../canvas/Timezone';
import CalendarDays from '../CalendarDays';
import { CalendarView, DayCalendarProps } from '../types';
import clsx from 'clsx';
import useTimestampPosition from '../../../hooks/useTimestampPosition';

export default function DayView(props: DayCalendarProps) {
	const { container, containerNav, timeIntervals, timePosition, currentTime } =
		useCalendarTime();
	const timestampPosition = useTimestampPosition();

	return (
		<div
			ref={container}
			className="flex flex-col flex-auto overflow-auto">
			<div
				ref={containerNav}
				style={{
					gridTemplateColumns: '7rem repeat(1, minmax(6rem, 1fr))',
				}}
				className="sticky top-0 z-30 grid bg-white divide-x ring-1 ring-black ring-opacity-5 sm:pr-8">
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
			<div
				className="grid w-full"
				style={{
					gridTemplateColumns: '7rem repeat(1, minmax(6rem, 1fr))',
				}}>
				<Timezone
					zone="est"
					currentTime={currentTime}
					timeIntervals={timeIntervals}
				/>

				<div className="relative grid flex-auto grid-cols-1 grid-rows-1 divide-y">
					<Timestamp position={timestampPosition} />
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
			</div>
		</div>
	);
}
