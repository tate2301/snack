import { ReactNode, useCallback, useMemo } from 'react';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import { AnimatePresence, useAnimate } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
	addSubtask,
	addTask,
	deleteSubtask,
	deleteTask,
	updateSubtask,
	updateTask,
} from '../../redux/tasks';
import {
	SnackSubtask,
	SnackTask,
	SnackTaskStatus,
} from '../../redux/tasks/types';
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
} from '@heroicons/react/24/outline';
import CalendarIcon from '../../icons/CalendarIcon';
import { generateUUID } from '../../lib/functions';
import { motion } from 'framer-motion';
import PostItNoteIcon from '../../icons/PostItNoteIcon';
import InProgressIcon from '../../icons/InProgressIcon';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import TodoIcon from '../../icons/TodoIcon';
import {
	addTaskToList,
	getListContainingTask,
	removeTaskFromList,
} from '../../redux/lists';
import { toast } from 'sonner';
import useDisclosure from '../../hooks/useDisclosure';
import TaskExpandedView from './TaskExpandedView';

export const useTaskFunctions = (task: SnackTask) => {
	const dispatch = useAppDispatch();
	const list = useAppSelector(getListContainingTask(task.id));

	const changeStatus = useCallback(
		(status: SnackTaskStatus) => {
			dispatch(
				updateTask({
					...task,
					status,
					complete: status === SnackTaskStatus.Complete,
				}),
			);

			if (status === SnackTaskStatus.Complete) {
				toast('Hurray! Task has been completed.', {
					description: task.title,
				});
			}
		},
		[task],
	);

	const changeList = useCallback(
		(listId: string) => {
			const oldListId = list.id;

			// Remove task from old list
			dispatch(
				removeTaskFromList({
					listId: oldListId,
					taskId: task.id,
				}),
			);

			// Add task to new list
			dispatch(
				addTaskToList({
					listId,
					taskId: task.id,
				}),
			);
		},
		[task, list],
	);

	const onAddSubTask = useCallback(
		(subtask: SnackSubtask) => {
			dispatch(addSubtask(subtask));
		},
		[task],
	);

	const onUpdateSubTask = useCallback(
		(subtask: SnackSubtask) => {
			dispatch(
				updateSubtask({
					...subtask,
					taskId: task.id,
				}),
			);
		},
		[task],
	);

	const onRemoveSubTask = useCallback(
		(subtaskId: string) => {
			dispatch(
				deleteSubtask({
					id: task.id,
					subtaskId,
				}),
			);
		},
		[task],
	);

	return {
		changeStatus,
		changeList,
		onAddSubTask,
		onUpdateSubTask,
		onRemoveSubTask,
	};
};

export default function TaskListItem(props: SnackTask & { icon?: ReactNode }) {
	const list = useAppSelector(getListContainingTask(props.id));
	const { changeStatus } = useTaskFunctions(props);
	const {
		isOpen: isTaskExpanded,
		onOpen: onTaskExpanded,
		onClose: onTaskMinimized,
	} = useDisclosure();

	const [isChecked] = useToggle(props.status === SnackTaskStatus.Complete);

	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: props.id,
		});

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

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<motion.div
			style={style}
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			onClick={onTaskExpanded}
			className={clsx(
				'px-4 py-2 bg-white rounded-xl group',
				isDragging ? 'z-40 relative shadow-xl' : 'z-0 static',
			)}>
			{isTaskExpanded && (
				<TaskExpandedView
					isOpen={isTaskExpanded}
					onClose={onTaskMinimized}
					{...props}
				/>
			)}
			<div className="flex items-center flex-1 h-full">
				<div className="flex-1 h-full">
					<AnimatePresence>
						<div className="flex items-center w-full gap-2">
							<input
								className="flex-shrink-0 rounded-xl"
								type="checkbox"
								onChange={onCheck}
								checked={isChecked}
							/>
							<p
								className={clsx(
									'flex-1 line-clamp-1 pr-2',
									isChecked ? 'line-through text-zinc-400 ' : 'text-surface-12',
								)}>
								{props.title}
							</p>
							<div className="flex items-center flex-shrink-0 gap-2 ml-2">
								<AnimatePresence>
									{props.description && (
										<PostItNoteIcon className="w-5 h-5 text-surface-8" />
									)}
									<p className="flex items-center gap-4 mx-2">
										<span
											style={{
												borderColor: `var(--${list.color}-10)`,
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
						{deadline && props.status !== SnackTaskStatus.Complete && (
							<div className="flex items-center gap-4 mt-1 transition-transform">
								<span
									className={clsx(
										'p-0.5 rounded px-1 text-sm font-medium',
										differenceInDays(deadline, new Date()) <= 0
											? 'bg-danger-4 text-danger-10'
											: 'bg-primary-4 text-primary-10',
									)}>
									{differenceInDays(deadline, new Date()) < 0
										? 'Was due'
										: differenceInDays(deadline, new Date()) === 0
										? 'Due'
										: 'Due in'}{' '}
									{differenceInDays(deadline, new Date()) < 0 &&
										Math.abs(differenceInDays(deadline, new Date())) +
											' days ago'}{' '}
									{differenceInDays(deadline, new Date()) > 0 &&
										Math.abs(differenceInDays(deadline, new Date())) +
											' days'}{' '}
									{differenceInDays(deadline, new Date()) === 0 && 'today'}
								</span>
							</div>
						)}
						<motion.div
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							className="flex flex-col gap-2">
							{props.description && (
								<p className="text-surface-10 line-clamp-2">
									{props.description}
								</p>
							)}

							<div className="flex gap-2">
								{props.tags?.map((tag) => (
									<Tag
										key={tag}
										value={tag}
									/>
								))}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
}

const TaskDropdownOptions = (props: SnackTask) => {
	const dispatch = useAppDispatch();
	const list = useAppSelector(getListContainingTask(props.id));

	const handleOnDuplicate = () => {
		const id = generateUUID();
		const newTask: SnackTask = { ...props };
		newTask.id = id;
		newTask.createdAt = new Date();

		dispatch(addTask(newTask));
	};

	const handleMoveToTrash = () => {
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

const SetReminderButton = () => {
	return (
		<Dropdown>
			<Dropdown.Trigger>
				<button className="flex items-center gap-2 px-2 py-1 text-surface-10 rounded-xl">
					<BellIcon className="w-5 h-5" />
				</button>
			</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.Item>
					<div className="flex items-center w-64 gap-4 text-surface-1">
						<SunIcon className="w-5 h-5" />
						<p className="flex-1">Later today</p>
						<p>
							{format(
								add(startOfToday(), { hours: 17, minutes: 30 }),
								'EEE HH:MM',
							)}
						</p>
					</div>
				</Dropdown.Item>
				<Dropdown.Item>
					<div className="flex items-center w-64 gap-4 text-surface-1">
						<CalendarIcon className="w-5 h-5" />
						<p className="flex-1">Tomorrow</p>
						<p>
							{format(add(startOfToday(), { days: 1, hours: 9 }), 'EEE HH:MM')}
						</p>
					</div>
				</Dropdown.Item>
				<Dropdown.Item>
					<div className="flex items-center w-64 gap-4 text-surface-1">
						<CalendarDaysIcon className="w-5 h-5" />
						<p className="flex-1">Pick Date & Time</p>
					</div>
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	);
};

const SelectPriority = () => {
	return (
		<Dropdown>
			<Dropdown.Trigger>
				<button className="flex items-center gap-2 px-2 py-1 font-normal text-surface-12 rounded-xl bg-surface-3">
					<BellIcon className="w-5 h-5" />
					Set reminder
				</button>
			</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.Item>
					<div className="flex items-center w-64 gap-4 text-surface-1">
						<SunIcon className="w-5 h-5" />
						<p className="flex-1">Later today</p>
						<p>
							{format(
								add(startOfToday(), { hours: 17, minutes: 30 }),
								'EEE HH:MM',
							)}
						</p>
					</div>
				</Dropdown.Item>
				<Dropdown.Item>
					<div className="flex items-center w-64 gap-4 text-surface-1">
						<CalendarIcon className="w-5 h-5" />
						<p className="flex-1">Tomorrow</p>
						<p>
							{format(add(startOfToday(), { days: 1, hours: 9 }), 'EEE HH:MM')}
						</p>
					</div>
				</Dropdown.Item>
				<Dropdown.Item>
					<div className="flex items-center w-64 gap-4 text-surface-1">
						<CalendarDaysIcon className="w-5 h-5" />
						<p className="flex-1">Pick Date & Time</p>
					</div>
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	);
};

function Tag(props: { value: string }) {
	return (
		<div className="flex gap-2">
			<p className="flex items-center gap-2 p-1 px-2 text-sm rounded-xl bg-surface-2">
				#{props.value}
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
