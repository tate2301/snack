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
	CalendarDaysIcon,
	ExclamationCircleIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import ProjectList from '../misc/lists/ProjectsList';
import Textarea from '../ui/input/textarea';
import { TaskChecklist } from './TaskExpandedView';
import { cn } from '../../lib/utils';
import AddDeadline from '../forms/Deadline';
import EmojiPicker from '../forms/EmojiPicker';
import PriorityList from '../misc/lists/PriorityList';
import AssigneeList from '../misc/lists/AssigneeList';
import { MilkdownEditorWrapper } from '../ui/editor';
import Datepicker from '../ui/datepicker';

const TaskPageView = (props: { id: string; addPadding?: boolean }) => {
	const { id } = props;
	const dispatch = useAppDispatch();

	const task = useAppSelector(selectTaskById(id));
	const list = useAppSelector(selectListByTaskId(id));
	const isStarred = useAppSelector(selectStarredItemById(id));

	const onStar = useCallback(() => {
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
	}, [isStarred, id]);

	const onDeadlineChanged = useCallback(
		(deadline: Date) => {
			dispatch(
				updateTask({
					...task,
					deadline,
				}),
			);
		},
		[task],
	);

	const onListChanged = useCallback(
		(listId) => {
			dispatch(removeTaskFromList({ listId: list.id, taskId: id }));
			dispatch(addTaskToList({ listId, taskId: id }));
		},
		[list, id],
	);

	const onChangeEmoji = useCallback(
		(value: string) => {
			dispatch(
				updateTask({
					...task,
					emoji: value,
				}),
			);
		},
		[task],
	);

	const onTitleChanged = useCallback(
		(title: string) => {
			dispatch(
				updateTask({
					...task,
					title,
				}),
			);
		},
		[task],
	);

	const onDescriptionChanged = useCallback(
		(description) => {
			dispatch(
				updateTask({
					...task,
					description,
				}),
			);
		},
		[id, task],
	);

	return (
		<>
			<div className={cn('container mx-auto max-w-screen-md px-2')}>
				<div className="mt-8 py-2 px-6">
					<div className="mb-4">
						<p className="text-7xl p-1 rounded-lg hover:bg-surface-3 w-fit">
							<EmojiPicker
								size="xl"
								value={task.emoji}
								onChange={onChangeEmoji}
							/>
						</p>
					</div>
					<div className="flex gap-4 mb-4">
						<p className="rounded-lg border border-zinc-400/30 hover:shadow-sm hover:bg-shadow">
							<ProjectList
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
				<div className="flex flex-col py-2 gap-1 mx-6">
					<TaskDetailItem
						label="Assignee"
						icon={<UserIcon className="w-5 h-5" />}>
						<AssigneeList onChange={() => null} />
					</TaskDetailItem>
					<TaskDetailItem
						label="Priority"
						icon={<ExclamationCircleIcon className="w-5 h-5" />}>
						<PriorityList
							onChange={() => null}
							priority={task.priority}
						/>
					</TaskDetailItem>
					<TaskDetailItem
						label="When"
						icon={<CalendarDaysIcon className="w-5 h-5" />}>
						<AddDeadline
							selectedDate={new Date(task.deadline || new Date())}
							selectDate={onDeadlineChanged}
						/>
					</TaskDetailItem>
				</div>
				<div className="flex flex-col gap-2 py-2 border-t border-b mx-6">
					<TaskChecklist {...task} />
				</div>
				<div className="flex flex-col !w-full !max-w-screen-xl px-6 prose prose-zinc prose-h1:font-semibold prose-headings:font-semibold py-4">
					<MilkdownEditorWrapper
						onChange={onDescriptionChanged}
						value={task.description}
					/>
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
			<p className="text-surface-12">{props.icon}</p>
			<p className="w-40 text-surface-12">{props.label}</p>
			<div className="flex-1 rounded-lg p-1">{props.children}</div>
		</div>
	);
};

export default TaskPageView;
