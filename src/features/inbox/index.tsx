'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../task/components/TaskListItem';
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
import TargetIcon from '../../assets/icons/TargetIcon';
import TaskQuickPreview from '../task/components/TaskQuickPreview';
import InboxIcon from '../../assets/icons/InboxIcon';
import {
	groupTasksByPeriod,
	groupTasksByProject,
	groupTasksByStatus,
} from '../../lib/core/tasks';
import { format, isEqual, startOfDay } from 'date-fns';
import { cn } from '../../lib/utils';
import { selectAllLists } from '../../redux/lists';

// <p className="text-xl text-surface-10">
// 	It's {format(startOfToday(), 'EEE dd MMM')}. You have {inProgress.length}{' '}
// 	pending tasks
// </p>;
export default function HomePage() {
	const [selectedTask, setSelectedTask] = useState<string>();
	const [groupBy, setGroupBy] = useState<
		'day' | 'week' | 'month' | 'status' | 'project'
	>('day');

	const allTasks = useAppSelector((state) => selectAllTasks(state));
	const allProjects = useAppSelector(selectAllLists);
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

	const groupedTasks = useMemo(() => {
		if (groupBy === 'day' || groupBy === 'month')
			return groupTasksByPeriod(allTasks.reverse(), groupBy);
		if (groupBy === 'status') return groupTasksByStatus(allTasks.reverse());
		if (groupBy === 'project')
			return groupTasksByProject(allTasks.reverse(), allProjects);
	}, [allTasks]);

	return (
		<CalendarLayout hasCalendar>
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
								'rounded-lg px-1 py-1 text-surface-9',
								groupBy === 'month' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setGroupBy('month')}>
							<CalendarDaysIcon className="w-6 h-6" />
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
								'rounded-lg px-2 py-1 text-surface-9',
								groupBy === 'project' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setGroupBy('project')}>
							<FolderIcon className="w-5 h-5" />
						</button>
					</div>
				}
			/>
			<div className=" flex-1 h-full items-start overflow-y-auto">

				<div className="flex flex-1 flex-col pb-8 space-y-12">
					{Object.keys(groupedTasks).map((key) => (
						<div className="p-4">
							<div>
								<p className="font-bold text-xl text-surface-12">
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

									{groupBy === 'project' && (
										<>
											{key}
											<span className="ml-2 rounded-lg bg-surface-4 py-0.5 px-1.5">
												{groupedTasks[key]?.length}
											</span>
										</>
									)}
								</p>
							</div>
							{groupedTasks[key]?.length > 0 &&
								groupedTasks[key].map((task) => (
									<div key={task.id}>
										<TaskListItem
											onExpandTask={() => onNavigate(task.id)}
											onSelectTask={(isFocused: boolean) =>
												onSelectTask(isFocused && task.id)
											}
											{...task}
										/>
									</div>
								))}
						</div>
					))}
				</div>
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
