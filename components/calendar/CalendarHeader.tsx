import { clsx } from 'clsx';
import { CalendarView } from './types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { add, isEqual, startOfToday } from 'date-fns';
import { useCallback } from 'react';

type CalendarHeaderProps = {
	view: CalendarView;
	selectedDate: Date;
	setView: (view: CalendarView) => void;
	selectDate: (date: Date) => void;
	next: () => void;
	prev: () => void;
};

const CalendarToggleButton = (props: {
	view: CalendarView;
	setView: (view: CalendarView) => void;
	value: CalendarView;
}) => (
	<button
		onClick={() => props.setView(props.value)}
		className={clsx(
			'text-sm px-3 rounded-lg py-1 capitalize transition-colors',
			props.view === props.value && 'bg-white drop-shadow',
		)}>
		{props.value}
	</button>
);

const CalendarHeader = (props: CalendarHeaderProps) => {
	// Autojump the user to today
	const jumpToToday = () => props.selectDate(startOfToday());

	return (
		<div className="bg-white">
			<div className={'p-4'}>
				<h1 className={'font-semibold uppercase text-xl'}>
					{Intl.DateTimeFormat('en-gb', {
						month: 'long',
						year: 'numeric',
					}).format(props.selectedDate)}
				</h1>
			</div>
			<div className={'border-b w-full justify-between flex gap-2 py-2 px-2'}>
				<div
					className={
						'w-auto flex-shrink-0 flex gap-1 p-2 rounded-tr-xl rounded-b-none border-b-0'
					}>
					<button
						className={'py-0.5 px-2 rounded font-semibold text-sm bg-zinc-100'}>
						+
					</button>
					<button
						className={
							'py-0.5 px-2 rounded text-sm font-semibold hover:bg-zinc-100'
						}>
						Activity
					</button>
				</div>
				<div className={'flex gap-4 items-center'}>
					<div className="flex gap-2">
						<button
							onClick={props.prev}
							className={
								'text-sm bg-white hover:ring-1 hover:shadow rounded-lg px-3 py-1 text-zinc-400 hover:text-zinc-800'
							}>
							<ChevronLeftIcon className="w-4 h-4" />
						</button>
						<button
							onClick={jumpToToday}
							className={clsx(
								'text-sm rounded-lg px-3 py-1',
								isEqual(props.selectedDate, startOfToday())
									? 'bg-zinc-950 text-white'
									: 'bg-white hover:shadow border',
							)}>
							Today
						</button>
						<button
							onClick={props.next}
							className={
								'text-sm bg-white hover:shadow hover:ring-1 rounded-lg px-3 py-1 text-zinc-400 hover:text-zinc-800'
							}>
							<ChevronRightIcon className="w-4 h-4" />
						</button>
					</div>
					<div className="flex p-1 overflow-hidden bg-zinc-100 rounded-xl group">
						<CalendarToggleButton
							{...props}
							value={CalendarView.Day}
						/>
						<CalendarToggleButton
							{...props}
							value={CalendarView.Week}
						/>
						<CalendarToggleButton
							{...props}
							value={CalendarView.Month}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarHeader;
