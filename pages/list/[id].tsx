'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import CreateTask from '../../components/create/CreateTask';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { PlayIcon } from '@heroicons/react/20/solid';
import {
	removeList,
	selectListById,
	selectTasksByListId,
} from '../../redux/lists';
import { ReactNode, useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import {
	EllipsisVerticalIcon,
	PauseIcon,
	StopIcon,
} from '@heroicons/react/24/solid';
import { SnackTask, SnackTaskStatus } from '../../redux/tasks/types';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import InProgressIcon from '../../icons/InProgressIcon';
import { useRouter } from 'next/router';
import ListOptions from '../../components/Lists/ListOptions';
import TodoIcon from '../../icons/TodoIcon';

const t = (n: number) => n * 1000;

export default function Page() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { id } = router.query as { id: string };
	const listObject = useAppSelector(selectListById(id));
	const allTasks = useAppSelector(selectTasksByListId(id));
	const [isEditDropdownOpen, toggleEditDropdown] = useToggle(true);

	const todoTasks = allTasks.filter(
		(task) => task.status == SnackTaskStatus.Todo,
	);
	const inProgressTasks = allTasks.filter(
		(task) => task.status === SnackTaskStatus.InProgress,
	);

	const completeTasks = allTasks.filter(
		(task) => task.complete || task.status === SnackTaskStatus.Complete,
	);

	const blockedTasks = allTasks.filter(
		(task) => !task.complete && task.status === SnackTaskStatus.Blocked,
	);

	const onEdit = (e) => {
		toggleEditDropdown();
	};

	const onDelete = (e) => {
		dispatch(removeList(id));
	};

	return (
		<CalendarLayout>
			<main className={'h-full flex gap-4 items-start'}>
				<div className="flex-1">
					<div className="mb-12">
						<div className="gap-2 mb-4">
							<div className="flex items-center justify-between">
								<h1 className="text-2xl font-medium text-surface-12">
									{listObject.name}
								</h1>
								<div>
									<ListOptions
										onEdit={onEdit}
										id={id}
										onDelete={onDelete}
									/>
								</div>
							</div>
							<p className="text-xl !outline-none text-surface-10">
								{listObject.description || 'Add a description'}
							</p>
						</div>
						<div className="w-full gap-4 mb-4">
							<div className="flex items-center gap-6">
								<p className="flex items-center font-medium">
									<CheckCircleIcon className="w-5 h-5 text-success-10" />
									<span className="ml-2">{completeTasks.length} complete</span>
								</p>
								<p className="flex items-center font-medium">
									<InProgressIcon className="w-5 h-5 text-primary-10" />
									<span className="ml-2">
										{inProgressTasks.length} in progress
									</span>
								</p>
								<p className="flex items-center font-medium">
									<XCircleIcon className="w-5 h-5 text-danger-10" />
									<span className="ml-2">{blockedTasks.length} blocked</span>
								</p>
							</div>
						</div>
						<CreateTask defaultList={id} />
					</div>
					<div className="flex flex-col gap-12 mt-8">
						<TasksList
							emptyStateLabel="All clear. You can never finish if you never start!"
							title="Todo"
							icon={<TodoIcon className="w-6 h-6 text-primary-10" />}
							tasks={todoTasks}
						/>
						<TasksList
							emptyStateLabel="No tasks yet"
							title="In Progress"
							icon={<InProgressIcon className="w-6 h-6 text-primary-10" />}
							tasks={inProgressTasks}
						/>
						<TasksList
							emptyStateLabel="Finish up your tasks for today!"
							title="Complete"
							icon={<CheckCircleIcon className="w-6 h-6 text-success-10" />}
							tasks={completeTasks}
						/>
						<TasksList
							emptyStateLabel="Yaay! No blocked tasks."
							title="Blocked"
							icon={<XCircleIcon className="w-6 h-6 text-danger-10" />}
							tasks={blockedTasks}
						/>
					</div>
				</div>
			</main>
		</CalendarLayout>
	);
}

const TasksList = (props: {
	title: string;
	icon: ReactNode;
	tasks: SnackTask[];
	emptyStateLabel: string;
}) => {
	return (
		<div>
			<div className="mb-2">
				<h1 className="flex items-center gap-2 text-xl font-medium text-surface-12">
					{props.icon}
					{props.title}
				</h1>
			</div>
			<div>
				<AnimatePresence initial={false}>
					{props.tasks.length > 0 ? (
						props.tasks.map((task) => (
							<motion.div
								layoutId={task.id}
								initial={{
									opacity: 0,
									height: 0,
								}}
								animate={{
									opacity: 1,
									height: 'auto',
								}}
								exit={{
									opacity: 0,
									height: 0,
								}}
								className="my-2">
								<TaskListItem
									key={task.id}
									{...task}
								/>
							</motion.div>
						))
					) : (
						<p className="px-10 text-surface-10">{props.emptyStateLabel}</p>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

function FocusTimerButton({}) {
	const [isRunning, toggle] = useToggle(false);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isRunning) {
			timer = setInterval(() => {
				setSeconds((prev) => prev + 1);
			}, 1000);
		}
		return () => {
			clearInterval(timer);
		};
	}, [isRunning]);

	return (
		<div
			className={clsx(
				'p-1 px-4 rounded-xl text-xl hover:shadow items-center',
				'gap-4 font-medium flex transition-all',
				isRunning
					? 'bg-zinc-900 text-white shadow'
					: 'bg-surface-1 text-surface-12 hover:bg-surface-1',
			)}>
			{
				// Convert seconds to HH:MM:SS
				new Date(seconds * 1000).toISOString().substr(11, 8)
			}
			<p className="flex gap-2">
				{seconds > 0 && !isRunning && (
					<button
						onClick={() => setSeconds(0)}
						className="p-2 rounded-xl hover:bg-surface-3">
						<StopIcon className="w-5 h-5 text-danger-10" />
					</button>
				)}
				<button
					onClick={toggle}
					className={clsx(
						'p-2 rounded-xl transition-all',
						isRunning ? 'hover:bg-danger-12' : 'hover:bg-danger-3',
					)}>
					{!isRunning ? (
						<PlayIcon className={'w-5 h-5'} />
					) : (
						<PauseIcon className="w-5 h-5 text-danger-9" />
					)}
				</button>
			</p>
		</div>
	);
}
