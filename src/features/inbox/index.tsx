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
import { groupTasksByPeriod, groupTasksByStatus } from '../../lib/core/tasks';
import { format, isEqual, startOfDay } from 'date-fns';
import { cn } from '../../lib/utils';

// <p className="text-xl text-surface-10">
// 	It's {format(startOfToday(), 'EEE dd MMM')}. You have {inProgress.length}{' '}
// 	pending tasks
// </p>;
export default function HomePage() {
	const [selectedTask, setSelectedTask] = useState<string>();
	const [groupBy, setGroupBy] = useState<'day' | 'week' | 'month' | 'status'>(
		'day',
	);

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

	const groupedTasks = useMemo(
		() =>
			groupBy !== 'status'
				? groupTasksByPeriod(allTasks.reverse(), groupBy)
				: groupTasksByStatus(allTasks.reverse()),
		[allTasks],
	);

	return (
		<CalendarLayout>
			<PageHeader
				options={{
					back: false,
				}}
				actions={
					<div className="rounded-xl text-sm flex gap-1">
						<button
							className={cn(
								'rounded-lg px-1 py-1 text-surface-9',
								groupBy === 'day' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setGroupBy('day')}>
							<HCalendarIcon className="w-6 h-6" />
						</button>
						<button
							className={cn(
								'rounded-lg px-2 py-1 text-surface-9',
								groupBy === 'status' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setGroupBy('status')}>
							<TargetIcon className="w-5 h-5" />
						</button>
						<button
							className={cn(
								'rounded-lg px-1 py-1 text-surface-9',
								groupBy === 'month' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setGroupBy('month')}>
							<CalendarDaysIcon className="w-6 h-6" />
						</button>
					</div>
				}
			/>
			<div className=" flex-1 h-full items-start overflow-y-auto">
				<div className="py-4 px-3">
					<h1 className="font-semibold text-2xl text-surface-12">Inbox</h1>
					<p>
						{allTasks.length} tasks,{' '}
						{allTasks.filter((task) => !task.complete).length} still pending
					</p>
				</div>
				<motion.div className="flex flex-1 flex-col pb-8 space-y-8">
					<AnimatePresence initial={false}>
						{Object.keys(groupedTasks).map((key) => (
							<div className="px-2">
								<div className="py-4 px-2">
									<p className="font-medium text-sm text-surface-10">
										{groupBy === 'day' &&
											format(new Date(key), 'EEE do MMM yyyy')}
										{groupBy === 'week' &&
											`${format(
												new Date(key.split('-W')[0]),
												'MMM yyyy',
											)}, Week ${key.split('-W')[1]}`}
										{groupBy === 'month' && format(new Date(key), 'MMM yyyy')}
										{groupBy === 'status' && (
											<>
												{key}
												<span className="ml-2 rounded-lg bg-surface-4 py-0.5 px-1.5">
													{groupedTasks[key].length}
												</span>
											</>
										)}
										{groupBy === 'day' &&
											isEqual(
												startOfDay(new Date(key)),
												startOfDay(new Date()),
											) && (
												<span className="py-1 px-1.5 rounded-lg bg-accent-10 text-white text-sm font-medium ml-2">
													Today
												</span>
											)}
									</p>
								</div>
								{groupedTasks[key].length > 0 &&
									groupedTasks[key].map((task) => (
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
