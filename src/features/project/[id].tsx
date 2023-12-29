'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
	changeIndexOfTaskInColumn,
	defaultKanbanBoards,
	removeList,
	selectListById,
	selectTasksForColumnInProject,
	selectTasksByListId,
	setColumn,
	moveTaskBetweenColumns,
} from '../../redux/lists';
import { useEffect } from 'react';
import { SnackTaskStatus } from '../../redux/tasks/types';
import useToggle from '../../lib/hooks/useToggle';
import ProjectOptions from './components/ListOptions';
import TaskExpandedView from '../task/components/TaskExpandedView';
import { useExpandTaskView } from '../task/components/hooks';
import { useParams } from 'react-router-dom';
import PageHeader, { PageType } from '../../components/navigation/Header';
import Column from '../../components/ui/kanban/Column';
import KanbanBoard from '../../components/ui/kanban/KanbanContainer';
import {
	addToStarred,
	removeStarred,
	selectStarredItemById,
} from '../../redux/starred';
import { AppEntity } from '../../redux/starred/types';
import { SnackIcons } from '../../context/EmojiAndIconContext';
import { changeTaskStatus } from '../../redux/tasks';

const t = (n: number) => n * 1000;

export default function ListPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const listObject = useAppSelector(selectListById(id));
	const isStarred = useAppSelector(selectStarredItemById(id));
	const allTasks = useAppSelector(selectTasksByListId(id));

	const [isCreateTaskFormOpen, toggleCreateTaskForm] = useToggle(false);

	const {
		idOfTaskBeingShown,
		onHideExpandedTaskView,
		onShowExpandedTaskView,
		taskBeingShownInExpandedView,
	} = useExpandTaskView();

	const onChangeIndex = (
		taskId: string,
		idx: number,
		newIdx: number,
		columnId: string,
	) => {
		dispatch(
			changeIndexOfTaskInColumn({
				columnId: columnId,
				taskId: taskId,
				newIndex: newIdx,
				oldIndex: idx,
				projectId: id,
			}),
		);
	};

	const onChangeBoard = (
		taskId: string,
		newBoard: string,
		oldBoard: string,
	) => {
		dispatch(changeTaskStatus({ id: taskId, status: newBoard }));
		dispatch(
			moveTaskBetweenColumns({
				taskId: taskId,
				fromColumnId: oldBoard,
				toColumnId: newBoard,
				projectId: id,
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
				options={{ create: true, share: true, back: true }}
				actions={
					<div className={'space-x-2 flex items-center'}>
						<ProjectOptions
							id={id}
							onDelete={onDelete}
						/>
					</div>
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
				</KanbanBoard>
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
	const items = useAppSelector(selectTasksForColumnInProject(projectId, id));
	console.log({ items });

	return (
		<Column
			title={title}
			icon={SnackIcons[id]}
			items={items}
			id={id}
			projectId={projectId}
			onExpandTask={onShowExpandedTaskView}
		/>
	);
};
