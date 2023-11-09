'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import { useAppSelector } from '../../redux/store';
import { selectAllTasks } from '../../redux/tasks';
import PageHeader from '../../components/nav/PageHeader';
import {
	ChevronDownIcon,
	Cog6ToothIcon,
	FolderIcon,
	UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import TargetIcon from '../../icons/TargetIcon';
import TaskSidebar from '../../components/Home/TaskSidebar';

// <p className="text-xl text-surface-10">
// 	It's {format(startOfToday(), 'EEE dd MMM')}. You have {inProgress.length}{' '}
// 	pending tasks
// </p>;
export default function HomePage() {
	const [selectedTask, setSelectedTask] = useState<string>();

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

	return (
		<CalendarLayout>
			<PageHeader
				title="Home"
				options={{
					create: true,
				}}
				actions={<></>}
			/>
			<motion.div className="flex flex-1 h-full items-start overflow-y-auto">
				<AnimatePresence>
					<motion.div className="flex flex-1 flex-col divide-y divide-surface-3 border-surface-3 border-b">
						<div className="flex p-2 gap-2">
							<button className="rounded-full border px-2 py-1 text-sm font-normal">
								<TargetIcon className="w-4 h-4" />
								Status
								<ChevronDownIcon className="w-4 h-4" />
							</button>
							<button className="rounded-full border px-2 py-1 text-sm font-normal">
								<FolderIcon className="w-4 h-4" />
								Project
								<ChevronDownIcon className="w-4 h-4" />
							</button>
							<button className="rounded-full border px-2 py-1 text-sm font-normal">
								<UserGroupIcon className="w-4 h-4" />
								Assignee
								<ChevronDownIcon className="w-4 h-4" />
							</button>
						</div>
						<AnimatePresence initial={false}>
							{allTasks.map((task) => (
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
						</AnimatePresence>
					</motion.div>
					{selectedTask && (
						<TaskSidebar
							{...{ onSelectTask, onNextItem, onPrevItem, selectedTask }}
						/>
					)}
				</AnimatePresence>
			</motion.div>
		</CalendarLayout>
	);
}
