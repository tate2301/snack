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
	CalendarDaysIcon, ClockIcon,
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
import { ArrowLongRightIcon, PlayIcon, StopIcon } from '@heroicons/react/20/solid';
import { PauseIcon } from '@heroicons/react/24/solid';
import TargetIcon from '../../../assets/icons/TargetIcon';

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
					<MilkdownEditorWrapper
						onChange={onDescriptionChanged}
						value={description ?? 'Type a description'}
					/>
				</div>
				<div className={"mx-6 flex flex-col mt-4 py-4 gap-4 bg-surface-3 rounded-xl p-4"}>
					<div className={"flex mb-2 space-x-2 items-center text-surface-12"}>
						<ClockIcon className={"w-5 h-5"} />
						<p className={"font-semibold"}>Time tracking</p>
					</div>
					<div className={"flex justify-between items-center"}>
						<div>
							<p className={"text-5xl font-semibold text-surface-12 mb-1"}>
								00:00:00
							</p>
							<p className={"text-surface-10"}> Total time tracked today: 5hr 10min</p>
						</div>
						<div className={"flex items-center justify-center space-x-4"}>
							<button className={"rounded-lg p-2 bg-surface-12 hover:ring-4 transition-all ring-surface-8 text-white pr-4"}>
								<TargetIcon className={"w-5 h-5"} />
								Add manual time
							</button>
							<button className={"rounded-lg p-2 bg-primary-10 hover:ring-4 transition-all ring-blue-600/20 text-white pr-4"}>
								<PlayIcon className={"w-5 h-5"} />
								Clock in
							</button>
							{false && (
								<>
									<button className={"rounded-lg py-1 px-3 bg-surface-12 text-white"}>
										Reset
									</button>
									<button className={"rounded-full p-2 bg-surface-12 text-white"}>
										<StopIcon className={"w-8 h-8"} />
									</button>
									<button className={"rounded-full p-2 bg-surface-12 text-white"}>
										<PauseIcon className={"w-8 h-8"} />
									</button>
								</>
							)}
						</div>
					</div>

					<div className={"rounded-xl bg-white p-4 flex justify-between mt-2 shadow items-center space-x-4"}>
						<div className={"p-3 rounded-xl bg-surface-4"}>
							<ClockIcon className={"w-6 h-6"} />
						</div>
						<div className={"flex-1"}>
							<p className={"font-medium"}>
								Latest session
							</p>
							<div className={"flex space-x-4 font-medium text-xl"}>
								<p className={cn("text-surface-12")}>
									00:00:00
								</p>
								<p>
									&bull;
								</p>
								<p className={"inline-flex items-center text-surface-12"}>
									13:02 <ArrowLongRightIcon className={"w-5 h-5 mx-2 text-surface-10"} /> 13:44
								</p>
							</div>
						</div>
						<div className={"flex gap-2 items-center"}>
							<button className={"rounded-lg py-1 px-3 bg-primary-10 text-primary-1"}>
								Continue session
							</button>
						</div>
					</div>

				</div>
				<div className="flex flex-col py-2 border-surface-3 px-6 mt-8">
					<div className={"flex items-baseline justify-between"}>
						<p className={"tetx-surface-10"}>
							{format(new Date(), "EEE, dd MMM")}
						</p>
						<p>
							Total: <span className={"font-medium text-surface-12"}>
							05:34:23
						</span>
						</p>
					</div>
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
