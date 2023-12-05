import { ReactNode, useCallback, useMemo } from 'react';
import {
	addTaskToList,
	removeTaskFromList,
	selectListByTaskId,
} from '../../../redux/lists';
import {
	addToStarred,
	removeStarred,
	selectStarredItemById,
} from '../../../redux/starred';
import { AppEntity } from '../../../redux/starred/types';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { selectTaskById, updateTask } from '../../../redux/tasks';
import {
	CalendarDaysIcon,
	ClockIcon,
	ExclamationCircleIcon,
	PlusIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import ProjectList from '../../../components/forms/select/ProjectsList';
import Textarea from '../../../components/ui/input/textarea';
import { TaskChecklist } from './TaskExpandedView';
import { cn } from '../../../lib/utils';
import AddDeadline from '../../../components/forms/Deadline';
import EmojiPicker from '../../../components/forms/EmojiPicker';
import PriorityList from '../../../components/forms/select/PriorityList';
import AssigneeList from '../../../components/forms/select/AssigneeList';
import { MilkdownEditorWrapper } from '../../../components/ui/editor';
import Datepicker from '../../../components/ui/datepicker';
import { format } from 'date-fns';
import {
	ArrowLongRightIcon,
	PlayIcon,
	StopIcon,
} from '@heroicons/react/20/solid';
import { PauseIcon } from '@heroicons/react/24/solid';
import TargetIcon from '../../../assets/icons/TargetIcon';
import RichTextarea from '../../../components/ui/snack-textarea';

const TaskPageView = (props: { id: string; addPadding?: boolean }) => {
	const { id } = props;
	const dispatch = useAppDispatch();

	const task = useAppSelector(selectTaskById(id));
	const list = useAppSelector(selectListByTaskId(id));
	const isStarred = useAppSelector(selectStarredItemById(id));

	const description = useMemo(() => task.description, [task]);

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
			<div className={cn('container mx-auto max-w-screen-md')}>
				<div className="mt-8 py-2 px-6">
					<div className="flex flex-col">
						<div className="flex items-start gap-4 w-full">
							{false && (
								<p className="text-7xl w-fit">
									<EmojiPicker
										size="md"
										value={task.emoji}
										onChange={onChangeEmoji}
									/>
								</p>
							)}
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
						<div className="flex space-x-4 items-center mt-2 !text-sm">
							<div className="border border-surface-4 rounded-lg hover:shadow-sm">
								<AddDeadline
									selectedDate={task.deadline && new Date(task.deadline)}
									selectDate={onDeadlineChanged}
								/>
							</div>
							<div className="rounded-lg hover:shadow-sm p-0.5 border border-surface-4">
								<PriorityList
									onChange={() => null}
									priority={task.priority}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col !w-full !max-w-screen-xl px-6 prose prose-zinc prose-h1:font-semibold prose-headings:font-semibold py-4">
					<RichTextarea
						onChange={onDescriptionChanged}
						value={description ?? 'Type a description'}
					/>
				</div>
				<div className="flex flex-col py-2 border-surface-3 px-6 mt-8">
					<TaskChecklist {...task} />
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