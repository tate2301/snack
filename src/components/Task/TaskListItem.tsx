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
import {
	selectListByTaskId,
	removeTaskFromList,
	selectProjectProgress,
} from '../../redux/lists';
import { cn } from '../../lib/utils';
import Clickable from '../ui/utils/Clickable';
import { FolderIcon, QueueListIcon } from '@heroicons/react/24/solid';
import useTaskFunctions from './hooks/useTaskFunctions';
import GridTaskListItem from './ListItem/Grid';
import DefaultTaskListItem from './ListItem';

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
	const projectProgress = useAppSelector(selectProjectProgress(list.id));
	const { changeStatus } = useTaskFunctions(props);

	const [isChecked] = useToggle(props.status === SnackTaskStatus.Complete);

	const deadline = useMemo(
		() => props.deadline && new Date(props.deadline),
		[props.deadline],
	);

	const onCheck: React.MouseEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();

		changeStatus(
			!isChecked ? SnackTaskStatus.Complete : SnackTaskStatus.InProgress,
		);

		return;
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
				<GridTaskListItem
					{...props}
					deadline={deadline}
				/>
			)}
			{(!props.view || props.view === TaskListItemView.List) && (
				<DefaultTaskListItem
					{...props}
					isChecked={props.complete}
					deadline={deadline}
					list={{ ...list, progress: projectProgress }}
					onCheck={onCheck}
				/>
			)}
		</Clickable>
	);
}

export const TaskDropdownOptions = (props: SnackTask) => {
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

export function TaskStatus(props: { status: SnackTaskStatus }) {
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
