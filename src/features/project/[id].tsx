'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Task/TaskListItem';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { PlayIcon } from '@heroicons/react/20/solid';
import {
	changeIndexOfTaskInColumn,
	defaultKanbanBoards,
	removeList,
	selectListById,
	selectTasksByColumnInList,
	selectTasksByListId,
} from '../../redux/lists';
import { ReactNode, useCallback } from 'react';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { FolderIcon } from '@heroicons/react/24/solid';
import { SnackTask, SnackTaskStatus } from '../../redux/tasks/types';
import useToggle from '../../hooks/useToggle';
import ProjectOptions from '../../components/Project/ListOptions';
import TodoIcon from '../../icons/TodoIcon';
import TaskExpandedView from '../../components/Task/TaskExpandedView';
import { useExpandTaskView } from '../../components/Task/hooks';
import { useParams } from 'react-router-dom';
import PageHeader, { PageType } from '../../components/navigation/Header';
import { cn } from '../../lib/utils';
import { Cog6ToothIcon, TrashIcon } from '@heroicons/react/24/outline';
import Column from '../../components/ui/kanban/Column';
import KanbanBoard from '../../components/ui/kanban/KanbanContainer';
import {
	addToStarred,
	removeStarred,
	selectStarredItemById,
} from '../../redux/starred';
import { AppEntity } from '../../redux/starred/types';
import { changeTaskStatus } from '../../redux/tasks';
import { SnackIcons } from '../../context/EmojiAndIconContext';
import AddColumn from '../../components/ui/kanban/modals/AddColumn';

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

	const onChangeIndex = useCallback(
		(taskId: string, idx: number, columnId: string) => {
			dispatch(
				changeIndexOfTaskInColumn({
					columnId: columnId,
					taskId: taskId,
					newIndex: idx,
					projectId: id,
				}),
			);
		},
		[id],
	);

	const onChangeBoard = (id: string, newBoard: string, oldBoard: string) => {
		dispatch(
			changeTaskStatus({
				id,
				status: newBoard,
			}),
		);
	};

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
						<ProjectOptions
							id={id}
							onDelete={onDelete}
						/>
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
				className={'h-full gap-4 flex flex-col items-start overflow-x-auto'}>
				<KanbanBoard
					onExpandTask={onShowExpandedTaskView}
					onChangeBoard={onChangeBoard}
					onChangeIndex={onChangeIndex}
					projectId={id}>
					{(listObject.columns ?? defaultKanbanBoards).map((board) => (
						<ProjectColumn
							id={board.id}
							key={board.id}
							title={board.title}
							projectId={id}
							onShowExpandedTaskView={onShowExpandedTaskView}
						/>
					))}
					<AddColumn />
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

const ProjectColumn = ({
	id,
	projectId,
	title,
	onShowExpandedTaskView,
}: {
	id: SnackTaskStatus;
	title: string;
	projectId: string;
	onShowExpandedTaskView: (taskId: string) => void;
}) => {
	const items = useAppSelector(selectTasksByColumnInList(projectId, id));
	return (
		<Column
			title={title}
			icon={SnackIcons[id]}
			items={items.map((item) => item.id)}
			id={id}
			projectId={projectId}
			onExpandTask={onShowExpandedTaskView}
		/>
	);
};

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