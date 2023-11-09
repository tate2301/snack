import { ArrowLeftIcon, PauseIcon, PlayIcon } from '@heroicons/react/20/solid';
import {
	CameraIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ClockIcon,
	ExclamationCircleIcon,
	FolderIcon,
	HashtagIcon,
	PlusIcon,
	TrashIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import CalendarLayout from '../../layouts/CalendarLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectTaskById, updateTask } from '../../redux/tasks';
import PageHeader, { PageType } from '../../components/nav/PageHeader';
import ProjectList from '../../components/misc/lists/ProjectsList';
import {
	addTaskToList,
	removeTaskFromList,
	selectListByTaskId,
} from '../../redux/lists';
import { ReactNode, useCallback } from 'react';
import { TaskChecklist } from '../../components/Home/TaskExpandedView';
import {
	addToStarred,
	removeStarred,
	selectStarredItemById,
} from '../../redux/starred';
import { AppEntity } from '../../redux/starred/types';
import { cn } from '../../lib/utils';
import EmojiPicker from '../../components/create/EmojiPicker';
import Textarea from '../../components/ui/input/textarea';
import CalendarIcon from '../../icons/CalendarIcon';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import PageLayout from '../../layouts/PageLayout';
import StarIcon from '../../icons/StarIcon';
import { Tag } from '../../components/Home/TaskListItem';
import TagsIcon from '../../icons/TagsIcon';
import TaskPageView from '../../components/Home/TaskPageView';

export default function TaskPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const task = useAppSelector(selectTaskById(id));
	const list = useAppSelector(selectListByTaskId(id));
	const isStarred = useAppSelector(selectStarredItemById(id));

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
						<button className="rounded-lg p-1">
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
				options={{ share: true }}
				actions={
					<>
						<button
							onClick={onStar}
							className="p-1 h-full flex items-center hover:bg-zinc-900/5 rounded-lg leading-none">
							{!isStarred && (
								<StarIcon
									className={cn(
										'w-6 h-6',
										isStarred ? 'text-warning-10' : 'text-surface-10',
									)}
								/>
							)}
							{isStarred && (
								<StarIcon
									className={cn(
										'w-6 h-6',
										isStarred
											? 'text-warning-10 !fill-warning-10'
											: 'text-surface-10',
									)}
								/>
							)}
						</button>

						<button className="hover:bg-zinc-900/10 flex items-center px-1 py-1 rounded-lg leading-none">
							<TrashIcon className="w-5 h-5" />
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
