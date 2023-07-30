import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDay,
	isEqual,
	isSameMonth,
	isToday,
	parse,
	startOfMonth,
	startOfToday,
	startOfWeek,
} from 'date-fns';
import { useMemo, useState } from 'react';
import useCalendarDates from '../../lib/hooks/useCalendarDates';

type Day = {
	date: string;
	isCurrentMonth?: boolean;
	isToday?: boolean;
};

type CalendarPreviewProps = {
	today?: Date;
};

const colStartClasses = [
	'',
	'col-start-2',
	'col-start-3',
	'col-start-4',
	'col-start-5',
	'col-start-6',
];

export default function CalendarPreview(props: CalendarPreviewProps) {
	let today = props.today ?? startOfToday();
	const {
		prevMonth,
		nextMonth,
		month,
		selectDay,
		firstDayOfCurrentMonth,
		selectedDate,
	} = useCalendarDates(today);

	return (
		<div className="flex-none hidden w-full md:block">
			<div className="flex items-center justify-end text-center text-zinc-900">
				<div className="flex gap-4">
					<button
						type="button"
						onClick={prevMonth}
						className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-zinc-400 hover:bg-zinc-100 rounded-lg">
						<span className="sr-only">Previous month</span>
						<ChevronLeftIcon
							className="w-5 h-5"
							aria-hidden="true"
						/>
					</button>
					<button
						type="button"
						onClick={nextMonth}
						className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-zinc-400 hover:bg-zinc-100 rounded-lg">
						<span className="sr-only">Next month</span>
						<ChevronRightIcon
							className="w-5 h-5"
							aria-hidden="true"
						/>
					</button>
				</div>
			</div>
			<div className="grid grid-cols-7 mt-6 text-xs leading-6 text-center uppercase text-zinc-500">
				<div>S</div>
				<div>M</div>
				<div>T</div>
				<div>W</div>
				<div>T</div>
				<div>F</div>
				<div>S</div>
			</div>
			<div className="grid grid-cols-7 gap-px mt-2 text-sm uppercase rounded-lg isolate">
				{month.map((day, dayIdx) => (
					<button
						key={day.toString()}
						type="button"
						onClick={() => selectDay(day)}
						className={clsx(
							'py-1.5 hover:bg-zinc-100 focus:z-10 rounded-xl flex items-center justify-center flex-col gap-1 transition-all',
							isSameMonth(day, firstDayOfCurrentMonth) ? 'bg-white' : '',
							(isEqual(day, selectedDate) || isToday(day)) && 'font-semibold',
							isEqual(day, selectedDate) &&
								'text-white bg-zinc-950 hover:bg-zinc-800',
							!isEqual(day, selectedDate) &&
								isSameMonth(day, firstDayOfCurrentMonth) &&
								!isToday(day) &&
								'text-zinc-800',
							!isEqual(day, selectedDate) &&
								!isSameMonth(day, today) &&
								!isToday(day) &&
								'text-zinc-400',
							isToday(day) && !isEqual(day, selectedDate) && 'text-blue-600',
							dayIdx === 0 && 'rounded-tl-lg',
							dayIdx === 6 && 'rounded-tr-lg',
							dayIdx === month.length - 7 && 'rounded-bl-lg',
							dayIdx === month.length - 1 && 'rounded-br-lg',
							dayIdx === 0 && colStartClasses[getDay(day)],
						)}>
						<time
							dateTime={day.getDate().toString()}
							className={clsx(
								'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
								// isEqual(day, selectedDate) && isToday(day) && 'bg-indigo-600',
								// isEqual(day, selectedDate) && !isToday(day) && 'bg-zinc-900',
							)}>
							{format(day, 'd')}
						</time>
						{isEqual(day, selectedDate) && (
							<div className="w-1 h-1 mx-auto bg-blue-600 rounded-full"></div>
						)}
					</button>
				))}
			</div>
		</div>
	);
}
