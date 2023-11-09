import { ReactNode, useMemo } from 'react';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addTask, deleteTask } from '../../redux/tasks';
import { SnackTask, SnackTaskStatus } from '../../redux/tasks/types';
import {
	BellIcon,
	CalendarDaysIcon,
	EllipsisVerticalIcon,
} from '@heroicons/react/24/solid';
import { add, differenceInDays, format, startOfToday } from 'date-fns';
import Dropdown from '../ui/dropdown-menu';
import {
	CheckCircleIcon,
	Square2StackIcon,
	SunIcon,
	TrashIcon,
	XCircleIcon,
} from '@heroicons/react/24/solid';
import CalendarIcon from '../../icons/CalendarIcon';
import { generateUUID } from '../../lib/functions';
import PostItNoteIcon from '../../icons/PostItNoteIcon';
import InProgressIcon from '../../icons/InProgressIcon';
import TodoIcon from '../../icons/TodoIcon';
import { selectListByTaskId, removeTaskFromList } from '../../redux/lists';
import { cn } from '../../lib/utils';
import Clickable from '../ui/utils/Clickable';
import { FolderIcon, QueueListIcon } from '@heroicons/react/24/solid';
import useTaskFunctions from './hooks/useTaskFunctions';

export enum TaskListItemView {
	Grid = 'Grid',
	List = 'List',
	Table = 'Table',
}

export default function TaskListItem(
	props: SnackTask & {
		icon?: ReactNode;
		onExpandTask: () => void;
		onSelectTask?: (isFocused: boolean) => void;
		view?: TaskListItemView;
	},
) {
	const list = useAppSelector(selectListByTaskId(props.id));
	const { changeStatus } = useTaskFunctions(props);

	const [isChecked] = useToggle(props.status === SnackTaskStatus.Complete);

	const deadline = useMemo(
		() => props.deadline && new Date(props.deadline),
		[props.deadline],
	);

	const onCheck = (e) => {
		e.preventDefault();
		e.stopPropagation();
		changeStatus(
			!isChecked ? SnackTaskStatus.Complete : SnackTaskStatus.InProgress,
		);
	};

	return (
		<Clickable
			onFocusCb={
				// Tell the parent if the task is focused on
				props.onSelectTask && ((isFocused) => props.onSelectTask(isFocused))
			}
			action={props.onExpandTask}
			className={clsx(
				'group p-1',
				props.view === TaskListItemView.Grid ? 'rounded-xl' : 'rounded',
			)}>
			{props.view === TaskListItemView.Grid && (
				<div className="h-full px-2 py-2 rounded-xl bg-surface-1 shadow">
					{props.description && (
						<PostItNoteIcon className="w-5 h-5 text-surface-8" />
					)}
					<p className="font-semibold text-surface-12 mt-1">
						{props.emoji && <span className="text-xl mr-2">{props.emoji}</span>}{' '}
						{props.title}
					</p>
					<div className="flex gap-2 items-center">
						{deadline && props.status !== SnackTaskStatus.Complete && (
							<p className="text-sm text-surface-10 mt-2">
								<span
									className={clsx(
										'p-0.5 rounded px-1 text-sm',
										differenceInDays(deadline, new Date()) <= 0
											? 'text-danger-10'
											: 'text-primary-11',
									)}>
									{format(deadline, 'MMM d')}
								</span>
							</p>
						)}
						{props.subtasks.length > 0 && (
							<p className="text-sm flex items-center gap-2 mt-2">
								&bull;
								<QueueListIcon className="w-4 h-4" />
								<span className="text-surface-10">
									{props.subtasks.filter((subtask) => subtask.complete).length}{' '}
									of {props.subtasks.length}
								</span>
							</p>
						)}
					</div>
					{props.tags && (
						<div className="flex gap-1 mt-2">
							{props.tags?.slice(0, 3).map((tag) => (
								<Tag
									key={tag}
									value={tag}
								/>
							))}
						</div>
					)}
				</div>
			)}
			{(!props.view || props.view === TaskListItemView.List) && (
				<div className="flex items-center flex-1 h-full px-2 rounded">
					<div className="flex-1 h-full">
						<AnimatePresence>
							<div className="flex items-center w-full gap-2">
								<input
									className="flex-shrink-0 rounded-xl relative z-1"
									type="checkbox"
									onChange={onCheck}
									checked={isChecked}
								/>

								<div className="flex-1 pr-2">
									<div className="flex items-center">
										<p>
											{props.emoji && (
												<span className="text-xl mr-2">{props.emoji}</span>
											)}
										</p>
										<p
											className={clsx(
												'line-clamp-1 pr-2',
												isChecked
													? 'line-through text-zinc-400 '
													: 'text-surface-12',
											)}>
											{' '}
											{props.title}
										</p>
									</div>
									{!props.complete && (
										<p className="text-sm text-surface-10 flex items-center gap-2">
											<span className="flex items-center gap-2">
												<FolderIcon className="w-4 h-4" />
												{list.name}
											</span>
											{deadline &&
												props.status !== SnackTaskStatus.Complete && (
													<>
														&bull;
														<span
															className={clsx(
																'p-0.5 rounded px-1 text-sm',
																differenceInDays(deadline, new Date()) <= 0
																	? 'text-danger-10'
																	: 'text-primary-11',
															)}>
															{format(deadline, 'MMM d')}
														</span>
													</>
												)}
											{props.subtasks.length > 0 && (
												<>
													&bull;
													<span className="flex gap-2 items-center">
														<QueueListIcon className="w-4 h-4" />
														<span className="text-surface-10">
															{
																props.subtasks.filter(
																	(subtask) => subtask.complete,
																).length
															}{' '}
															of {props.subtasks.length}
														</span>
													</span>
												</>
											)}
										</p>
									)}
								</div>

								<div className="flex items-center flex-shrink-0 gap-2 ml-2">
									<AnimatePresence>
										{props.description && (
											<PostItNoteIcon className="w-5 h-5 text-surface-8" />
										)}
										<p className="flex items-center gap-4 mx-2">
											<span
												style={{
													borderColor: `#${list.color}`,
												}}
												className="w-4 h-4 border-2 rounded-md"
											/>
										</p>
										<TaskStatus status={props.status} />

										<TaskDropdownOptions
											{...props}
											id={props.id}
										/>
									</AnimatePresence>
								</div>
							</div>
						</AnimatePresence>
					</div>
				</div>
			)}
		</Clickable>
	);
}

const TaskDropdownOptions = (props: SnackTask) => {
	const dispatch = useAppDispatch();
	const list = useAppSelector(selectListByTaskId(props.id));

	const handleOnDuplicate = () => {
		const id = generateUUID();
		const newTask: SnackTask = { ...props };
		newTask.id = id;
		newTask.createdAt = new Date();

		dispatch(addTask(newTask));
	};

	const handleMoveToTrash = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(deleteTask(props.id));
		dispatch(
			removeTaskFromList({
				listId: list.id,
				taskId: props.id,
			}),
		);
	};

	return (
		<>
			<Dropdown>
				<Dropdown.Trigger>
					<button className="p-1 transition-all text-surface-12 hover:bg-surface-3 rounded-xl group-hover:opacity-100">
						<EllipsisVerticalIcon className="w-6 h-6" />
					</button>
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Item onClick={handleOnDuplicate}>
						<Square2StackIcon className="w-5 h-5" />
						Duplicate
					</Dropdown.Item>
					<Dropdown.Item onClick={handleMoveToTrash}>
						<TrashIcon className="w-5 h-5" />
						Delete
					</Dropdown.Item>
				</Dropdown.Content>
			</Dropdown>
		</>
	);
};

export function Tag(props: { value: string; isColor?: boolean }) {
	return (
		<div className="flex gap-2">
			<p
				className={cn(
					'flex items-center gap-2 p-0.5 px-2 text-sm rounded-full bg-accent-10 text-white',
					!props.isColor &&
						'border text-surface-10 border-surface-4 bg-transparent',
				)}>
				{props.value}
			</p>
		</div>
	);
}

function TaskStatus(props: { status: SnackTaskStatus }) {
	return (
		<>
			{props.status === SnackTaskStatus.Todo && (
				<p className="flex items-center gap-4 mx-2">
					<TodoIcon className="w-5 h-5 text-primary-10" />
				</p>
			)}
			{props.status === SnackTaskStatus.InProgress && (
				<p className="flex items-center gap-4 mx-2">
					<InProgressIcon className="w-5 h-5 text-primary-10" />
				</p>
			)}
			{props.status === SnackTaskStatus.Complete && (
				<p className="flex items-center gap-4 mx-2">
					<CheckCircleIcon className="w-5 h-5 text-success-10" />
				</p>
			)}
			{props.status === SnackTaskStatus.Blocked && (
				<p className="flex items-center gap-4 mx-2">
					<XCircleIcon className="w-5 h-5 text-danger-10" />
				</p>
			)}
		</>
	);
}
