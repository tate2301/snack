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
	defaultKanbanBoards,
	removeList,
	selectListById,
	selectTasksByListId,
} from '../../redux/lists';
import { ReactNode } from 'react';
import {
	CheckCircleIcon,
	ChevronRightIcon,
	StarIcon,
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
import {
	Cog6ToothIcon,
	EllipsisHorizontalIcon,
	PlusIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import Column from '../../components/ui/kanban/Column';
import KanbanBoard from '../../components/ui/kanban/KanbanContainer';
import {
	addToStarred,
	removeStarred,
	selectStarredItemById,
} from '../../redux/starred';
import { AppEntity } from '../../redux/starred/types';

const t = (n: number) => n * 1000;

export default function ListPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const listObject = useAppSelector(selectListById(id));
	const allTasks = useAppSelector(selectTasksByListId(id));
	const isStarred = useAppSelector(selectStarredItemById(id));

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

	const onStar = () => {
		if (!isStarred) {
			dispatch(
				addToStarred({
					id,
					entity: AppEntity.Project,
				}),
			);
		}

		if (isStarred) {
			dispatch(removeStarred({ id }));
		}
	};

	return (
		<CalendarLayout>
			<PageHeader
				projectId={id}
				options={{ create: true, share: true }}
				actions={
					<>
						<button
							onClick={onStar}
							className="p-2 h-full flex items-center hover:bg-zinc-900/10 rounded-lg leading-none">
							<StarIcon
								className={cn(
									'w-5 h-5',
									isStarred ? 'text-warning-10' : 'text-surface-10',
								)}
							/>
						</button>
						<button
							onClick={onDelete}
							className="p-2 h-full flex items-center hover:bg-zinc-900/10 rounded-lg leading-none">
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
				className={
					'h-full gap-4  flex flex-col items-start overflow-x-auto max-w-full'
				}>
				<KanbanBoard projectId={id}>
					{(listObject.columns ?? defaultKanbanBoards).map((board) => (
						<Column
							title={board.title}
							icon={<TodoIcon className="w-5 h-5 text-primary-10" />}
							items={board.items}
							id={board.id}
							projectId={id}
							onExpandTask={onShowExpandedTaskView}
						/>
					))}
				</KanbanBoard>
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
