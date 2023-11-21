'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Task/TaskListItem';
import { useAppSelector } from '../../redux/store';
import { selectAllTasks } from '../../redux/tasks';
import PageHeader from '../../components/navigation/Header';
import {
	CalendarDaysIcon,
	CalendarIcon as HCalendarIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	FolderIcon,
	UserGroupIcon,
	Square2StackIcon,
	Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import TargetIcon from '../../icons/TargetIcon';
import TaskQuickPreview from '../../components/Task/TaskQuickPreview';
import InboxIcon from '../../icons/InboxIcon';
import { groupTasksByPeriod } from '../../lib/core/tasks';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

// <p className="text-xl text-surface-10">
// 	It's {format(startOfToday(), 'EEE dd MMM')}. You have {inProgress.length}{' '}
// 	pending tasks
// </p>;
export default function HomePage() {
	const [selectedTask, setSelectedTask] = useState<string>();
	const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');

	const allTasks = useAppSelector((state) => selectAllTasks(state));
	const navigate = useNavigate();

	const t = (n: number) => n * 1000;

	const onNavigate = (id: string) => {
		navigate(`/task/${id}`);
	};

	const onSelectTask = (id: string) => {
		setSelectedTask(id);
	};

	const onNextItem = () => {
		const current = allTasks.find((task) => task.id === selectedTask);
		const indexOfCurrent = allTasks.indexOf(current);

		if (indexOfCurrent < allTasks.length)
			onSelectTask(allTasks[indexOfCurrent + 1].id);
	};

	const onPrevItem = () => {
		const current = allTasks.find((task) => task.id === selectedTask);
		const indexOfCurrent = allTasks.indexOf(current);

		if (indexOfCurrent > 0) onSelectTask(allTasks[indexOfCurrent - 1].id);
	};

	const tasksWithDates = useMemo(
		() => groupTasksByPeriod(allTasks.reverse(), period),
		[allTasks],
	);

	return (
		<CalendarLayout>
			<PageHeader
				actions={
					<div className="rounded-xl border p-0.5 border-surface-5 text-sm flex gap-1">
						<button
							className={cn(
								'rounded-lg px-1 py-1 text-surface-9',
								period === 'day' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setPeriod('day')}>
							<HCalendarIcon className="w-6 h-6" />
						</button>

						<button
							className={cn(
								'rounded-lg px-1 py-1 text-surface-9',
								period === 'month' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setPeriod('month')}>
							<CalendarDaysIcon className="w-6 h-6" />
						</button>
					</div>
				}
			/>
			<div className=" flex-1 h-full items-start overflow-y-auto">
				<div className="py-4 px-3 flex space-x-2 items-center">
					<InboxIcon className="w-6 h-6" />
					<h1 className="font-semibold text-2xl text-surface-12">Inbox</h1>
				</div>
				<motion.div className="flex flex-1 flex-col pb-8 space-y-8">
					<AnimatePresence initial={false}>
						{Object.keys(tasksWithDates).map((key) => (
							<div>
								<div className="p-4">
									<p className="font-medium text-sm text-surface-10 ">
										{period === 'day' &&
											format(new Date(key), 'EEE do MMM yyyy')}
										{period === 'week' &&
											`${format(
												new Date(key.split('-W')[0]),
												'MMM yyyy',
											)}, Week ${key.split('-W')[1]}`}
										{period === 'month' && format(new Date(key), 'MMM yyyy')}
									</p>
								</div>
								{tasksWithDates[key].length > 0 &&
									tasksWithDates[key].map((task) => (
										<motion.div
											key={task.id}
											initial={{
												opacity: 0,
												height: 0,
											}}
											animate={{
												opacity: 1,
												height: 'auto',
												transition: {
													type: 'spring',
													bounce: 0.3,
													opactiy: {
														delay: t(0.02),
													},
												},
											}}
											exit={{
												opacity: 0,
												height: 0,
											}}>
											<TaskListItem
												onExpandTask={() => onNavigate(task.id)}
												onSelectTask={(isFocused: boolean) =>
													onSelectTask(isFocused && task.id)
												}
												{...task}
											/>
										</motion.div>
									))}
							</div>
						))}
					</AnimatePresence>
				</motion.div>
				{selectedTask && (
					<TaskQuickPreview
						isOpen={!!selectedTask}
						onClose={() => onSelectTask(null)}
						{...{ onSelectTask, onNextItem, onPrevItem, selectedTask }}
					/>
				)}
			</div>
		</CalendarLayout>
	);
}
