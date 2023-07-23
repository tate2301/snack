'use client';

import { ChevronRightIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';
import TaskItem from '../components/TaskItem';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import NewTaskForm from '../components/forms/NewTaskForm';

const generateDeltaDays = (delta: number): Array<{ date: number, day: string, isActive?: boolean }> => {
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

const DateItem = ({ date, day, isActive }) => {
	const ref = useRef(null);
	useEffect(() => {
		if (isActive && ref.current) {
			// scroll parent to position this element in the center x-axis
			const el = ref.current;
			const parent = el.parentElement;
			const parentRect = parent.getBoundingClientRect();
			const elRect = el.getBoundingClientRect();
			const scrollLeft = elRect.left - parentRect.left - (parentRect.width - elRect.width) / 2;
			parent.scrollTo({ left: scrollLeft, behavior: 'smooth' });
		}
	}, [isActive]);

	return (
		<div ref={ref}
				 className={clsx(['p-4 py-2 flex items-center border flex-col gap-1 rounded-lg text-center relative', !isActive && 'text-zinc-500', isActive && 'bg-zinc-950 text-white shadow border-none'])}>
			<div className={'h-2 w-2 rounded-full bg-orange-500 absolute top-1 right-1'} />
			<p className='text-xl font-bold'>{date}</p>
			<p className='text-sm'>{day}</p>
		</div>
	);
};

export default function Page() {
	return (
		<main className='h-full w-full flex flex-col justify-between'>
			<div className='flex-1 max-w-full'>
				<div className='flex gap-2 items-center p-4 overflow-x-hidden snap-mandatory snap-center'>
					{
						generateDeltaDays(4).map((day, i) => (
							<DateItem key={i} {...day} />))
					}
				</div>
				<NewTaskForm />
				<div className='px-2'>
					<motion.div layout className='flex flex-col'>
						<TaskItem id={1} />
						<TaskItem id={2} />
						<TaskItem id={3} />
					</motion.div>
				</div>
			</div>
		</main>
	);
}

const HomeCard = ({ title, description, href, icon }) => {
	return (
		<div className='group items-center flex justify-between  gap-4'>
			<p className='p-1 bg-orange-600 text-white rounded-lg'>
				<Square3Stack3DIcon className='w-4 h-4' />
			</p>
			<div className='flex items-center py-2 gap-4 w-full justify-between border-b'>
				<p>{title}</p>
				<ChevronRightIcon className='w-5 h-5 text-zinc-500 group-hover:text-blue-600' />
			</div>
		</div>
	);
};
