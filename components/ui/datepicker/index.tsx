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
import useCalendarDates from '../../../hooks/useCalendarDates';

type Day = {
	date: string;
	isCurrentMonth?: boolean;
	isToday?: boolean;
};

type CalendarPreviewProps = {
	value?: Date;
	onChange: (date: Date) => void;
};

const colStartClasses = [
	'',
	'col-start-2',
	'col-start-3',
	'col-start-4',
	'col-start-5',
	'col-start-6',
];

export default function Datepicker(props: CalendarPreviewProps) {
	let today = props.value ?? startOfToday();
	const { prevMonth, nextMonth, month, firstDayOfCurrentMonth, selectedDate } =
		useCalendarDates(today);

	const selectDate = (date: Date) => {
		props.onChange(date);
	};

	return (
		<div className="w-full">
			<div className="flex gap-2 mb-4">
				<button
					type="button"
					onClick={() => selectDate(add(startOfToday(), { days: 1 }))}
					className="flex text-sm flex-none items-center justify-center p-1.5 bg-surface-3 hover:bg-surface-6 rounded-xl px-3">
					Tomorrow
				</button>
				<button
					type="button"
					onClick={() => selectDate(add(startOfToday(), { days: 5 }))}
					className="flex text-sm flex-none items-center justify-center p-1.5 bg-surface-3 hover:bg-surface-6 rounded-xl px-3">
					In 5 days
				</button>
				<button
					type="button"
					onClick={() => selectDate(endOfMonth(startOfToday()))}
					className="flex text-sm flex-none items-center justify-center p-1.5 bg-surface-3 hover:bg-surface-6 rounded-xl px-3">
					Monthend
				</button>
			</div>
			<div className="flex items-center justify-between px-2 text-center text-zinc-900">
				<button
					type="button"
					onClick={prevMonth}
					className="flex flex-none items-center justify-center p-1.5 hover:shadow rounded-xl bg-surface-2 text-surface-12">
					<span className="sr-only">Previous month</span>
					<ChevronLeftIcon
						className="w-5 h-5"
						aria-hidden="true"
					/>
				</button>
				<p className="font-semibold uppercase text-zinc-900">
					{format(firstDayOfCurrentMonth, 'MMMM yyyy')}
				</p>
				<button
					type="button"
					onClick={nextMonth}
					className="flex flex-none items-center justify-center p-1.5 hover:shadow rounded-xl bg-surface-2 text-surface-12">
					<span className="sr-only">Next month</span>
					<ChevronRightIcon
						className="w-5 h-5"
						aria-hidden="true"
					/>
				</button>
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
			<div className="grid grid-cols-7 gap-px mt-2 text-sm uppercase rounded-xl isolate">
				{month.map((day, dayIdx) => (
					<button
						key={day.toString()}
						type="button"
						onClick={() => selectDate(day)}
						className={clsx(
							'py-1.5 hover:bg-zinc-100 focus:z-10 rounded-xl flex items-center justify-center flex-col gap-1 transition-all',
							(isEqual(day, selectedDate) || isToday(day)) && 'font-semibold',

							!isEqual(day, selectedDate) &&
								isSameMonth(day, firstDayOfCurrentMonth) &&
								!isToday(day) &&
								'text-zinc-800',
							!isEqual(day, selectedDate) &&
								!isSameMonth(day, today) &&
								!isToday(day) &&
								'text-zinc-400',
							isToday(day) && !isEqual(day, selectedDate) && 'text-purple-600',
							dayIdx === 0 && 'rounded-tl-lg',
							dayIdx === 6 && 'rounded-tr-lg',
							dayIdx === month.length - 7 && 'rounded-bl-lg',
							dayIdx === month.length - 1 && 'rounded-br-lg',
							dayIdx === 0 && colStartClasses[getDay(day)],
							isEqual(day, selectedDate) &&
								'!text-white bg-zinc-950 hover:bg-zinc-800',
							isSameMonth(day, firstDayOfCurrentMonth) ? 'text-zinc-900' : '',
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
					</button>
				))}
			</div>
		</div>
	);
}
