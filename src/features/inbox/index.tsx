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
	Square3Stack3DIcon, Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TargetIcon from '../../assets/icons/TargetIcon';
import TaskQuickPreview from '../task/components/TaskQuickPreview';
import InboxIcon from '../../assets/icons/InboxIcon';
import {
	groupTasksByPeriod,
	groupTasksByProject,
	groupTasksByStatus,
} from '../../lib/core/tasks';
import { differenceInDays, format, isEqual, startOfDay, startOfToday, sub, subDays } from 'date-fns';
import { cn } from '../../lib/utils';
import { selectAllLists } from '../../redux/lists';
import DropdownMenu from '../../components/ui/dropdown-menu';
import { difference } from 'lodash';

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

	useEffect(() => {
		document.title = "Inbox - Snack"
	}, []);

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

	const FilterOptions = () => (
		<DropdownMenu>
			<DropdownMenu.Trigger className={"hover:bg-surface-1 text-surface-12 font-medium shadow-sm shadow-surface-2 rounded-lg py-1.5 px-3 border border-surface-4"}>
				<Squares2X2Icon className={"w-5 h-5"} />
				Group by
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item onClick={() => setGroupBy("day")} className={cn(
					'rounded-lg text-surface-1',
					groupBy === 'day' && '!bg-surface-4 !text-surface-12',
				)}>
						<HCalendarIcon className="w-6 h-6" />
						Day
				</DropdownMenu.Item>
				<DropdownMenu.Item onClick={() => setGroupBy("month")} className={cn(
					'rounded-lg text-surface-1',
					groupBy === 'month' && '!bg-surface-4 !text-surface-12',
				)}>
					<CalendarDaysIcon className={"w-5 h-5"} />
						Month
				</DropdownMenu.Item>
				<DropdownMenu.Item onClick={() => setGroupBy("status")} className={cn(
					'rounded-lg text-surface-1',
					groupBy === 'status' && '!bg-surface-4 !text-surface-12',
				)}>
						<TargetIcon className="w-5 h-5" />
						Status
				</DropdownMenu.Item>
				<DropdownMenu.Item onClick={() => setGroupBy("project")} className={cn(
					'rounded-lg text-surface-1',
					groupBy === 'project' && '!bg-surface-4 !text-surface-12',
				)}>
						<FolderIcon className="w-5 h-5" />
						Project
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)

	return (
		<CalendarLayout hasCalendar>
			<PageHeader
				options={{
					back: false,
				}}
				actions={
					<div className="rounded-xl text-sm flex gap-1">
						<FilterOptions />
					</div>
				}
			/>
			<div className=" flex-1 h-full items-start overflow-y-auto pt-8">

				<div className="flex flex-1 flex-col pb-8 space-y-12">
					{Object.keys(groupedTasks).filter((key) => {
						if(groupBy === "status" || groupBy === "project") return true
						return differenceInDays(startOfDay(new Date(key)), startOfToday()) < 0 || differenceInDays(startOfDay(new Date(key)), startOfToday()) === 0
					}).map((key) => (
						<div className={cn('p-4', isEqual(
							startOfDay(new Date(key)),
							startOfDay(new Date()),
						) && "border-b border-surface-2")}>
							<div className={"py-1"}>
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
