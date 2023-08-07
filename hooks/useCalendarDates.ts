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

const useCalendarDates = (today: Date) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(today);
	const [currentMonth, setCurrentMonth] = useState<string>(
		format(selectedDate, 'MMMM yyyy'),
	);

	const firstDayOfCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date());

	const month = useMemo(
		() =>
			eachDayOfInterval({
				start: startOfWeek(startOfMonth(firstDayOfCurrentMonth)),
				end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
			}),
		[firstDayOfCurrentMonth],
	);

	const week = useMemo(
		() =>
			eachDayOfInterval({
				start: startOfWeek(selectedDate),
				end: endOfWeek(selectedDate),
			}),
		[selectedDate],
	);

	const selectDate = (day: Date) => {
		setSelectedDate(day);
	};

	const nextDate = () => {
		selectDate(add(selectedDate, { days: 1 }));
	};

	const prevDate = () => {
		selectDate(add(selectedDate, { days: -1 }));
	};

	const nextWeek = () => {
		selectDate(add(selectedDate, { weeks: 1 }));
	};

	const prevWeek = () => {
		selectDate(add(selectedDate, { weeks: -1 }));
	};

	const nextMonth = () => {
		const firstDayNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'));
	};

	const prevMonth = () => {
		const firstDayPrevMonth = add(firstDayOfCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayPrevMonth, 'MMMM yyyy'));
	};

	return {
		selectDate,
		selectedDate,
		week,
		month,
		nextDate,
		prevDate,
		nextWeek,
		prevWeek,
		nextMonth,
		prevMonth,
		firstDayOfCurrentMonth,
	};
};

export default useCalendarDates;
