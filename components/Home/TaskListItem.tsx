import { ReactNode, useCallback } from 'react';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import { useAnimate } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addTask, updateTask } from '../../redux/tasks';
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
} from '@heroicons/react/24/outline';
import CalendarIcon from '../../icons/CalendarIcon';
import { generateUUID } from '../../lib/functions';
import TargetIcon from '../../icons/TargetIcon';
import { motion } from 'framer-motion';
import PostItNoteIcon from '../../icons/PostItNoteIcon';
import InProgressIcon from '../../icons/InProgressIcon';
import ArrowsExpand from '../../icons/ArrowsExpand';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import TodoIcon from '../../icons/TodoIcon';
import SelectList from '../create/SelectList';
import {
	addTaskToList,
	getListContainingTask,
	removeTaskFromList,
} from '../../redux/lists';

const useTaskFunctions = (task: SnackTask) => {
	const dispatch = useAppDispatch();
	const list = useAppSelector(getListContainingTask(task.id));

	const changeStatus = useCallback(
		(status: SnackTaskStatus) => {
			dispatch(
				updateTask({
					...task,
					status,
				}),
			);
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

	return {
		changeStatus,
		changeList,
	};
};

export default function TaskListItem(props: SnackTask & { icon?: ReactNode }) {
	const dispatch = useAppDispatch();
	const list = useAppSelector(getListContainingTask(props.id));
	const { changeList, changeStatus } = useTaskFunctions(props);
	const [isOpen, onToggle] = useToggle(false);
	const [isChecked, toggle] = useToggle(props.complete);
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: props.id,
		});

	let [ref, animate] = useAnimate();

	const onCheck = (e) => {
		e.preventDefault();
		e.stopPropagation();

		dispatch(
			updateTask({
				...props,
				complete: !isChecked,
				status: !isChecked
					? SnackTaskStatus.Complete
					: SnackTaskStatus.InProgress,
			}),
		);

		toggle();
		animate('input', {
			scale: [1, 1.15, 1],
			opacity: [1, 0.5, 1],
		});
		animate('p', {
			opacity: isChecked ? [0.7, 1] : [1, 0.7, 1],
			textDecorationLine: !isChecked ? 'line-through' : 'none',
		});
	};

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<div
			style={style}
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			className={clsx(
				'px-4 py-2 relative bg-white rounded-xl group',
				isDragging && 'z-40 shadow-xl',
			)}>
			<div className={clsx('justify-between flex items-start')}>
				<div
					ref={ref}
					className="flex items-start flex-1 my-auto">
					<input
						className="flex-shrink-0 rounded-xl"
						type="checkbox"
						onChange={onCheck}
						checked={isChecked}
					/>
					<div
						className="flex-1 h-full"
						onClick={onToggle}>
						<p
							className={clsx(
								'flex-1 line-clamp-1',
								isChecked ? 'line-through text-zinc-400 ' : 'text-surface-12',
							)}>
							{props.title}
						</p>
						<div className="flex items-center gap-4 mt-1">
							{props.deadline && (
								<span
									className={clsx(
										'p-0.5 rounded px-1 text-sm font-semibold',
										differenceInDays(props.deadline, new Date()) <= 0
											? 'bg-danger-4 text-danger-10'
											: 'bg-primary-4 text-primary-10',
									)}>
									{differenceInDays(props.deadline, new Date()) < 0
										? 'Was due'
										: differenceInDays(props.deadline, new Date()) === 0
										? 'Due'
										: 'Due in'}{' '}
									{differenceInDays(props.deadline, new Date()) < 0 &&
										Math.abs(differenceInDays(props.deadline, new Date())) +
											' days ago'}{' '}
									{differenceInDays(props.deadline, new Date()) > 0 &&
										Math.abs(differenceInDays(props.deadline, new Date())) +
											' days'}{' '}
									{differenceInDays(props.deadline, new Date()) === 0 &&
										'today'}
								</span>
							)}
							{props.tags?.map((tag) => (
								<Tag
									key={tag}
									value={tag}
								/>
							))}
						</div>
						{isOpen && (
							<motion.div className="flex flex-col gap-2 py-2">
								<p className="text-surface-12">{props.description}</p>
								<div className="flex items-center justify-start gap-4">
									<SelectStatus
										status={props.status}
										onChange={changeStatus}
									/>
									<div className="rounded-xl bg-surface-2">
										<SelectList
											onChange={changeList}
											defaultListId={list.id}
										/>
									</div>

									<SetReminderButton />
								</div>
							</motion.div>
						)}
					</div>
				</div>
				<div className="flex items-center gap-2 ">
					{!isOpen && (
						<>
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
						</>
					)}
					{isOpen && (
						<>
							<button className="flex items-center gap-2 p-2 font-normal rounded-xl hover:bg-surface-3">
								<ArrowsExpand className="w-4 h-4" />
							</button>
						</>
					)}
					<TaskDropdownOptions
						{...props}
						id={props.id}
					/>
				</div>
			</div>
		</div>
	);
}

const TaskDropdownOptions = (props: SnackTask) => {
	const dispatch = useAppDispatch();

	const handleOnDuplicate = () => {
		const id = generateUUID();
		const newTask: SnackTask = { ...props };
		newTask.id = id;
		newTask.createdAt = new Date();

		dispatch(addTask(newTask));
	};

	const handleMoveToTrash = () => {
		dispatch(
			updateTask({
				...props,
				trashed: true,
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
					<Dropdown.Item>
						<TargetIcon className="w-5 h-5 text-warning-10" />
						Focus on this
					</Dropdown.Item>
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
				<button className="flex items-center gap-2 px-2 py-1 text-surface-12 rounded-xl bg-surface-2">
					<BellIcon className="w-5 h-5" />
					Reminder
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

const SelectStatus = (props: {
	status: SnackTaskStatus;
	onChange: (status: SnackTaskStatus) => void;
}) => {
	return (
		<Select
			defaultValue={props.status ?? SnackTaskStatus.Todo}
			onValueChange={props.onChange}>
			<SelectTrigger className="bg-surface-2 text-surface-12">
				<SelectValue placeholder={'Select status'} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={SnackTaskStatus.Todo}>
					<div className="flex items-center gap-2">
						<TodoIcon className="w-5 h-5" />
						<p className="flex-1">{SnackTaskStatus.Todo}</p>
					</div>
				</SelectItem>
				<SelectItem value={SnackTaskStatus.InProgress}>
					<div className="flex items-center gap-2">
						<InProgressIcon className="w-5 h-5" />
						<p className="flex-1">{SnackTaskStatus.InProgress}</p>
					</div>
				</SelectItem>
				<SelectItem value={SnackTaskStatus.Complete}>
					<div className="flex items-center gap-2">
						<CheckCircleIcon className="w-5 h-5" />
						<p className="flex-1">{SnackTaskStatus.Complete}</p>
					</div>
				</SelectItem>
				<SelectItem value={SnackTaskStatus.Blocked}>
					<div className="flex items-center gap-2">
						<XCircleIcon className="w-5 h-5" />
						<p className="flex-1">{SnackTaskStatus.Blocked}</p>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
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
