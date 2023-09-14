'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem, {
	TaskListItemView,
} from '../../components/Home/TaskListItem';
import CreateTask from '../../components/create/CreateTask';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { PlayIcon } from '@heroicons/react/20/solid';
import {
	removeList,
	selectListById,
	selectTasksByListId,
} from '../../redux/lists';
import { ReactNode } from 'react';
import {
	CheckCircleIcon,
	ChevronRightIcon,
	Cog6ToothIcon,
	StarIcon,
	TrashIcon,
	XCircleIcon,
} from '@heroicons/react/24/solid';
import { FolderIcon } from '@heroicons/react/24/solid';
import { SnackTask, SnackTaskStatus } from '../../redux/tasks/types';
import useToggle from '../../hooks/useToggle';
import InProgressIcon from '../../icons/InProgressIcon';
import ListOptions from '../../components/Lists/ListOptions';
import TodoIcon from '../../icons/TodoIcon';
import TaskExpandedView from '../../components/Home/TaskExpandedView';
import { useExpandTaskView } from '../../components/Home/hooks';
import { useParams } from 'react-router-dom';
import PageHeader, { PageType } from '../../components/nav/PageHeader';
import { cn } from '../../lib/utils';
import { generateUUID } from '../../lib/functions';
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline';
import Column from '../../components/ui/kanban/Column';

const t = (n: number) => n * 1000;

export default function ListPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const listObject = useAppSelector(selectListById(id));
	const allTasks = useAppSelector(selectTasksByListId(id));

	const [isCreateTaskFormOpen, toggleCreateTaskForm] = useToggle(false);

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
			<PageHeader
				actions={
					<>
						<button className="p-2 h-full flex items-center hover:bg-zinc-900/10 rounded-lg leading-none">
							<StarIcon className="w-5 h-5" />
						</button>
						<button className="p-2 h-full flex items-center hover:bg-zinc-900/10 rounded-lg leading-none">
							<TrashIcon className="w-5 h-5" />
						</button>
						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<ListOptions
								id={id}
								onDelete={onDelete}
								trigger={<Cog6ToothIcon className="w-5 h-5" />}
							/>
						</button>
					</>
				}
				title={listObject.name}
				pageType={PageType.Project}
			/>
			{taskBeingShownInExpandedView && (
				<TaskExpandedView
					{...taskBeingShownInExpandedView}
					isOpen={!!idOfTaskBeingShown}
					onClose={onHideExpandedTaskView}
				/>
			)}
			<main
				className={'h-full gap-4 items-start overflow-x-auto w-full flex-1'}>
				<div className="flex-1 h-full flex flex-col">
					{isCreateTaskFormOpen && (
						<div className="mb-12">
							<CreateTask
								overrideOpenState={isCreateTaskFormOpen}
								overrideToggle={toggleCreateTaskForm}
								defaultList={id}
							/>
						</div>
					)}
					<div className="flex items-start gap-4 h-full overflow-x-auto py-2 px-4">
						<Column
							title="Todo"
							icon={<TodoIcon className="w-5 h-5 text-primary-10" />}
							tasks={todoTasks}
							id={id}
							onExpandTask={onShowExpandedTaskView}
						/>
						<Column
							title="In Progress"
							icon={<InProgressIcon className="w-5 h-5 text-primary-10" />}
							tasks={inProgressTasks}
							id={id}
							onExpandTask={onShowExpandedTaskView}
						/>
						<Column
							title="Complete"
							icon={<CheckCircleIcon className="w-5 h-5 text-success-10" />}
							tasks={completeTasks}
							id={id}
							onExpandTask={onShowExpandedTaskView}
						/>
						<Column
							title="Blocked"
							icon={<XCircleIcon className="w-5 h-5 text-danger-10" />}
							tasks={blockedTasks}
							id={id}
							onExpandTask={onShowExpandedTaskView}
						/>
					</div>
					{false && (
						<div className="flex flex-col gap-16 mt-8">
							<TasksList
								emptyStateLabel="All clear. You can never finish if you never start!"
								title="Feature board"
								icon={<TodoIcon className="w-4 h-4 text-primary-10" />}
								tasks={allTasks}
								onExpandTask={onShowExpandedTaskView}
							/>
						</div>
					)}
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
	const [isTasksInFolderShowing, toggleShowTasksInFolder] = useToggle(true);

	return (
		<div className="flex flex-col gap-2">
			<div
				onDoubleClick={toggleShowTasksInFolder}
				className={cn(
					'flex justify-between text-center items-baseline rounded-xl px-1 py-0.5',
					isTasksInFolderShowing && 'bg-zinc-900/10',
				)}>
				<div className="flex gap-2 items-center">
					<button
						onClick={toggleShowTasksInFolder}
						className="p-2 rounded-xl transition-colors">
						<ChevronRightIcon
							className={cn(
								'w-4 h-4 transition-all duration-200',
								isTasksInFolderShowing && 'rotate-90',
							)}
						/>
					</button>
					<FolderIcon className="w-5 h-5" />
					<input
						value={props.title}
						className="flex items-baseline py-0 my-0 gap-2 outline-none bg-transparent font-semibold text-surface-11"
					/>
				</div>
				<div className="flex gap-4 items-center flex-shrink-0">
					<div className="flex gap-2 px-4 py-2 rounded-full items-center">
						<PlayIcon className="w-4 h-4" />
						<p>16:23:09</p>
					</div>
				</div>
			</div>
			{isTasksInFolderShowing && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}>
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
				</motion.div>
			)}
		</div>
	);
};
