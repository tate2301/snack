'use client';

import TaskItem from '../components/TaskItem';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef } from 'react';
import CalendarLayout from '../layouts/CalendarLayout';
import FocusPeriod from '../components/focus/Focus';
import FocusTaskItem from '../components/TaskItem/FocusTaskItem';

const generateDeltaDays = (
	delta: number,
): Array<{ date: number; day: string; isActive?: boolean }> => {
	// return delta days before today + today + delta days after today
	const today = new Date();
	const days = [];
	for (let i = -delta; i <= delta; i++) {
		const date = new Date(today);
		date.setDate(date.getDate() + i);
		days.push({
			date: date.getDate(),
			day: date.toLocaleString('default', { weekday: 'short' }),
			isActive: i === 0,
		});
	}
	return days;
};

const DateItem = ({
	date,
	day,
	isActive,
}: {
	date: number;
	day: string;
	isActive?: boolean;
}) => {
	const ref = useRef(null);
	useEffect(() => {
		if (isActive && ref.current) {
			// scroll parent to position this element in the center x-axis
			const el = ref.current;
			const parent = el.parentElement;
			const parentRect = parent.getBoundingClientRect();
			const elRect = el.getBoundingClientRect();
			const scrollLeft =
				elRect.left - parentRect.left - (parentRect.width - elRect.width) / 2;
			parent.scrollTo({ left: scrollLeft, behavior: 'smooth' });
		}
	}, [isActive]);

	return (
		<div
			ref={ref}
			className={clsx([
				'p-4 py-2 flex items-center border flex-col gap-1 rounded-lg text-center relative',
				!isActive && 'text-zinc-500',
				isActive && 'bg-zinc-950 text-white shadow border-none',
			])}>
			<div
				className={'h-2 w-2 rounded-full bg-blue-500 absolute top-1 right-1'}
			/>
			<p className="text-xl font-semibold">{date}</p>
			<p className="text-sm">{day}</p>
		</div>
	);
};

export default function Page() {
	return (
		<CalendarLayout>
			<main className="flex flex-col justify-between w-full h-full">
				<div className="flex-1 max-w-full w-[32rem]">
					<motion.div
						layout
						className="flex flex-col mb-8">
						<div className={'rounded-xl'}>
							<FocusTaskItem
								id={2}
								inFocus
							/>
						</div>
					</motion.div>
				</div>
			</main>
		</CalendarLayout>
	);
}

const SectionHeading = (props: { children: ReactNode }) => (
	<h2
		className={
			'uppercase text-zinc-500 text-sm before:min-w-1/4 after:min-w-1/4 before:flex-1 after:flex-1 gap-4 before:border-zinc-200 after:border-zinc-200 before:border-b flex w-full justify-between after:border-b items-center'
		}>
		{props.children}
	</h2>
);
