'use client';

import TaskItem from '../components/TaskItem';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef } from 'react';
import CalendarLayout from '../layouts/CalendarLayout';
import FocusPeriod from '../components/focus/Focus';
import FocusTaskItem from '../components/TaskItem/FocusTaskItem';
import TaskList from '../components/Home/TaskList';
import { PlusIcon } from '@heroicons/react/20/solid';
import AppRouter from '../components/nav/AppRouter';

export default function Page() {
	return (
		<CalendarLayout>
			<main>
				<AppRouter />
				<TaskList />
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
