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
import {
	CheckCircleIcon,
	ClipboardIcon,
	Cog6ToothIcon,
	PlusIcon,
	Square2StackIcon,
	TrashIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import { PauseIcon, PencilIcon, StopIcon } from '@heroicons/react/24/solid';
import { SnackTask, SnackTaskStatus } from '../../redux/tasks/types';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import InProgressIcon from '../../icons/InProgressIcon';
import ListOptions from '../../components/Lists/ListOptions';
import TodoIcon from '../../icons/TodoIcon';
import TaskExpandedView from '../../components/Home/TaskExpandedView';
import { useExpandTaskView } from '../../components/Home/hooks';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/nav/PageHeader';
import { BackButton } from '../task/[taskId]';

const t = (n: number) => n * 1000;

export default function ListPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const listObject = useAppSelector(selectListById(id));
	const allTasks = useAppSelector(selectTasksByListId(id));

	const {
		idOfTaskBeingShown,
		onHideExpandedTaskView,
		onShowExpandedTaskView,
		taskBeingShownInExpandedView,
	} = useExpandTaskView();

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

	const onDelete = (e) => {
		dispatch(removeList(id));
	};

	return (
		<CalendarLayout>
			<PageHeader>
				<div className="w-full flex justify-between">
					<div className="flex gap-4 items-center">
						<BackButton />
						<h1 className="font-semibold text-zinc-900">{listObject.name}</h1>
					</div>
					<div className="flex gap-2">
						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<PlusIcon className="w-5 h-5" />
							Add task
						</button>
						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<PlusIcon className="w-5 h-5" />
							Create list
						</button>
						<button className="p-2 h-full flex items-center px-2 hover:bg-zinc-900/10 py-1 rounded-lg leading-none">
							<Square2StackIcon className="w-5 h-5" />
						</button>
						<button className="p-2 h-full flex items-center px-2 hover:bg-zinc-900/10 py-1 rounded-lg leading-none">
							<TrashIcon className="w-5 h-5" />
						</button>
						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<ListOptions
										id={id}
										onDelete={onDelete}
										trigger={<Cog6ToothIcon className="w-5 h-5" />}
									/>
						</button>
					</div>
				</div>
			</PageHeader>
			{taskBeingShownInExpandedView && (
				<TaskExpandedView
					{...taskBeingShownInExpandedView}
					isOpen={!!idOfTaskBeingShown}
					onClose={onHideExpandedTaskView}
				/>
			)}
			<main className={'h-full flex gap-4 items-start'}>
				<div className="flex-1">
					<div className="mb-12">
						<div className="flex items-center gap-6 mb-2">
								<p className="flex items-center font-semibold">
									<CheckCircleIcon className="w-5 h-5 text-success-10" />
									<span className="ml-2">{completeTasks.length} complete</span>
								</p>
								<p className="flex items-center font-semibold">
									<InProgressIcon className="w-5 h-5 text-primary-10" />
									<span className="ml-2">
										{inProgressTasks.length} in progress
									</span>
								</p>
								<p className="flex items-center font-semibold">
									<XCircleIcon className="w-5 h-5 text-danger-10" />
									<span className="ml-2">{blockedTasks.length} blocked</span>
								</p>
						</div>
						<div className="gap-2 mb-12">
							<div className="flex items-center justify-between mb-1">
								<h1 className="text-3xl font-bold text-surface-12 flex items-center gap-2">
									{listObject.name}
								</h1>
							</div>
							<p className="text-lg !outline-none text-surface-10">
								{listObject.description || 'Notes about this project'}
							</p>
						</div>
						
						<CreateTask defaultList={id} />
					</div>
					<div className="flex flex-col gap-16 mt-8">
						<TasksList
							emptyStateLabel="All clear. You can never finish if you never start!"
							title="Feature board"
							icon={<TodoIcon className="w-4 h-4 text-primary-10" />}
							tasks={allTasks}
							onExpandTask={onShowExpandedTaskView}
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
	onExpandTask: (id: string) => void;
}) => {
	return (
		<div>
			<div className="pb-2">
				<h1 className="flex items-center gap-2 text-lg border-b pb-2 border-surface-3 font-semibold text-surface-11">
					{props.title}
				</h1>
			</div>
			<div>
				<AnimatePresence initial={false}>
					{props.tasks.length > 0 ? (
						props.tasks.map((task) => (
							<motion.div
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
								}}
								exit={{
									opacity: 0,
								}}
								className="my-2">
								<TaskListItem
									key={task.id}
									onExpandTask={() => props.onExpandTask(task.id)}
									{...task}
								/>
							</motion.div>
						))
					) : (
						<p className="text-surface-10">{props.emptyStateLabel}</p>
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
				'gap-4 font-semibold flex transition-all',
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
