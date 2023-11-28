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
			'text-sm px-2 rounded-md py-1 capitalize transition-colors',
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
			<div className={'bg-white w-full justify-end flex gap-2 px-2'}>
				<div className={'flex gap-4 items-center'}>
					<div className="flex gap-2">
						<button
							onClick={props.prev}
							className={
								'text-sm bg-white rounded-lg px-2 py-1 text-zinc-400 hover:text-surface-12 hover:bg-surface-4'
							}>
							<ChevronLeftIcon className="w-4 h-4" />
						</button>
						<button
							onClick={jumpToToday}
							className={clsx(
								'text-sm rounded-lg px-2 py-1',
								isEqual(props.selectedDate, startOfToday())
									? 'bg-primary-11 text-white'
									: 'bg-white hover:shadow border',
							)}>
							Today
						</button>
						<button
							onClick={props.next}
							className={
								'text-sm bg-white rounded-lg px-2 py-1 text-zinc-400 hover:text-surface-12 hover:bg-surface-4'
							}>
							<ChevronRightIcon className="w-4 h-4" />
						</button>
					</div>
					<div className="flex p-1 overflow-hidden bg-surface-4 rounded-lg group">

						<CalendarToggleButton
							{...props}
							value={CalendarView.Day}
						/>
						<CalendarToggleButton
							{...props}
							value={CalendarView.Week}
						/>

					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarHeader;
