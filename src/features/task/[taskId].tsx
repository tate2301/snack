import {
	ChevronLeftIcon,
	ChevronRightIcon,
	CurrencyDollarIcon,
	FolderIcon,
	HeartIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import CalendarLayout from '../../layouts/CalendarLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectTaskById, updateTask } from '../../redux/tasks';
import PageHeader, { PageType } from '../../components/navigation/Header';
import {
	addTaskToList,
	removeTaskFromList,
	selectListByTaskId,
} from '../../redux/lists';
import { useCallback } from 'react';
import {
	addToStarred,
	removeStarred,
	selectStarredItemById,
} from '../../redux/starred';
import { AppEntity } from '../../redux/starred/types';
import { cn } from '../../lib/utils';
import StarIcon from '../../icons/StarIcon';
import TaskPageView from '../../components/Task/TaskPageView';
import StartTimerButton from '../time-tracking/components/StartTimerButton';

export default function TaskPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const task = useAppSelector(selectTaskById(id));
	const list = useAppSelector(selectListByTaskId(id));
	const isStarred = useAppSelector(selectStarredItemById(id));

	const onNavigateToProject = useCallback(() => {
		navigate(`/list/${list.id}`);
	}, [list.id]);

	const onStar = () => {
		if (!isStarred) {
			dispatch(
				addToStarred({
					id,
					entity: AppEntity.Task,
				}),
			);
		}

		if (isStarred) {
			dispatch(removeStarred({ id }));
		}
	};

	const onListChanged = useCallback(
		(listId) => {
			dispatch(removeTaskFromList({ listId: list.id, taskId: id }));
			dispatch(addTaskToList({ listId, taskId: id }));
		},
		[list, id],
	);

	const onChangeEmoji = (value: string) => {
		dispatch(
			updateTask({
				...task,
				emoji: value,
			}),
		);
	};

	const onTitleChanged = (title: string) => {
		dispatch(
			updateTask({
				...task,
				title,
			}),
		);
	};

	return (
		<CalendarLayout>
			<PageHeader
				title={
					<p className="flex items-center gap-2">
						<button
							onClick={onNavigateToProject}
							className="rounded-lg py-1 px-2 hover:bg-surface-3">
							<FolderIcon className="w-4 h-4" />
							{list.name}
						</button>
						<button className="p-1">
							<ChevronRightIcon className="w-4 h-4" />
						</button>
						<span className="truncate">{task.title}</span>
					</p>
				}
				pageType={PageType.Task}
				options={{ share: true, back: true }}
				actions={
					<>
						<StartTimerButton
							taskId={id}
							sessionId={null}
						/>
						<button className="hover:bg-surface-3 flex items-center p-1.5 rounded-lg leading-none">
							<CurrencyDollarIcon className="w-5 h-5" />
						</button>
						<button
							onClick={onStar}
							className="p-1 h-full flex items-center hover:bg-zinc-900/5 rounded-lg leading-none">
							{!isStarred && (
								<HeartIcon
									className={cn(
										'w-6 h-6',
										isStarred ? 'text-warning-10' : 'text-surface-10',
									)}
								/>
							)}
							{isStarred && (
								<HeartIcon
									className={cn(
										'w-6 h-6',
										isStarred
											? 'text-warning-10 !fill-danger-10 !stroke-none'
											: 'text-surface-10',
									)}
								/>
							)}
						</button>
					</>
				}
			/>
			<main className="flex-1 flex flex-col">
				<TaskPageView id={id} />
			</main>
		</CalendarLayout>
	);
}

export function BackButton() {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate(-1)}
			className="p-1 hover:bg-zinc-900/10 px-2 py-1 rounded-lg">
			<ChevronLeftIcon className="w-5 h-5" />
		</button>
	);
}
