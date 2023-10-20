import { ReactNode, useCallback } from 'react';
import {
	addTaskToList,
	removeTaskFromList,
	selectListByTaskId,
} from '../../redux/lists';
import {
	addToStarred,
	removeStarred,
	selectStarredItemById,
} from '../../redux/starred';
import { AppEntity } from '../../redux/starred/types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectTaskById, updateTask } from '../../redux/tasks';
import {
	CameraIcon,
	ExclamationCircleIcon,
	HashtagIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import SelectList from '../create/SelectList';
import Textarea from '../ui/input/textarea';
import CalendarIcon from '../../icons/CalendarIcon';
import TagsIcon from '../../icons/TagsIcon';
import { Tag } from './TaskListItem';
import { TaskChecklist } from './TaskExpandedView';
import { cn } from '../../lib/utils';

const TaskPageView = (props: { id: string; addPadding?: boolean }) => {
	const { id } = props;
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
		<>
			<div
				className={cn(
					'container mx-auto max-w-screen-md',
					props.addPadding && 'px-8',
				)}>
				<div className="mt-8 py-2">
					<div className="flex gap-4 mb-4">
						{false && (
							<button className="px-4 rounded-lg py-1 bg-zinc-900/5">
								<CameraIcon className="w-5 h-5" />
								Cover
							</button>
						)}
						<p className="rounded-lg border border-zinc-400/30 hover:shadow-sm hover:bg-shadow">
							<SelectList
								onChange={onListChanged}
								defaultListId={list.id}
							/>
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-start gap-4 w-full">
							<Textarea
								onChange={(e) => {
									onTitleChanged(e.target.value);
								}}
								name={'title'}
								value={task.title}
								placeholder="Task name"
								className="text-3xl bg-transparent font-semibold text-zinc-900 w-full outline-none flex-1"
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col py-2 gap-1">
					<TaskDetailItem
						label="ID"
						icon={<HashtagIcon className="w-5 h-5" />}>
						<p className="px-3 py-1 font-semibold rounded-lg bg-zinc-900/5 text-sm w-fit">
							RNG-022
						</p>
					</TaskDetailItem>
					<TaskDetailItem
						label="Assignee"
						icon={<UserIcon className="w-5 h-5" />}>
						<p>Tatenda Chris</p>
					</TaskDetailItem>
					<TaskDetailItem
						label="Priority"
						icon={<ExclamationCircleIcon className="w-5 h-5" />}>
						<p>Urgent</p>
					</TaskDetailItem>
					<TaskDetailItem
						label="When"
						icon={<CalendarIcon className="w-5 h-5" />}>
						<p>Tomorrow</p>
					</TaskDetailItem>
					<TaskDetailItem
						label="Tags"
						icon={<TagsIcon className="w-6 h-6" />}>
						<p>
							<Tag
								value={'Engineering'}
								isColor
							/>
						</p>
					</TaskDetailItem>
				</div>
				<div className="flex flex-col gap-2 py-2 border-t">
					<TaskChecklist {...task} />
				</div>
				<div className="flex flex-col py-2 border-t">
					<p className="p-2 rounded-lg">Welcome</p>
				</div>
			</div>
		</>
	);
};

const TaskDetailItem = (props: {
	children: ReactNode;
	icon: ReactNode;
	label: string;
}) => {
	return (
		<div className="flex gap-4 items-center">
			{props.icon}
			<p className="w-40">{props.label}</p>
			<div className="flex-1 rounded-lg hover:bg-zinc-900/5 p-2">
				{props.children}
			</div>
		</div>
	);
};

export default TaskPageView;
