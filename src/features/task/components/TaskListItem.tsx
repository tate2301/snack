import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import useToggle from '../../../lib/hooks/useToggle';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { addTask, deleteTask } from '../../../redux/tasks';
import { SnackTask, SnackTaskStatus } from '../../../redux/tasks/types';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import Dropdown from '../../../components/ui/dropdown-menu';
import { Square2StackIcon, TrashIcon } from '@heroicons/react/24/solid';
import { generateUUID } from '../../../lib/functions';
import {
	selectListByTaskId,
	removeTaskFromList,
	selectProjectProgress,
} from '../../../redux/lists';
import { cn } from '../../../lib/utils';
import useTaskFunctions from './hooks/useTaskFunctions';
import GridTaskListItem from './ListItem/Grid';
import DefaultTaskListItem from './ListItem/DefaultTaskListItem';
import DetailedTaskListItem from './ListItem/DetailedTaskListItem';
import { useKeyboardListeners } from '../../../context/KeyboardNavigationContext';
import SFSymbol from '../../../assets/icons/SFSymbol';
import { iconColors } from '../../../styles/constants';
import { motion } from 'framer-motion';
import { differenceInDays, format, sub } from 'date-fns';

export enum TaskListItemView {
	Grid = 'Grid',
	List = 'List',
	Table = 'Table',
}

export default function TaskListItem(
	props: SnackTask & {
		icon?: ReactNode;
		onExpandTask: () => void;
		onCollapseTask?: () => void;
		onSelectTask?: (isFocused: boolean) => void;
		view?: TaskListItemView;
		isSelected?: boolean;
		selectedTask?: string;
	},
) {
	const taskRef = useRef<HTMLDivElement>();
	const list = useAppSelector(selectListByTaskId(props.id));
	const projectProgress = useAppSelector(selectProjectProgress(list.id));
	const { changeStatus } = useTaskFunctions(props);
	const [isChecked] = useToggle(props.status === SnackTaskStatus.Complete);
	const { registerListeners, unregisterListeners } = useKeyboardListeners();

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

	const collapseListener = useCallback((e: KeyboardEvent) => {
		props.onCollapseTask && props.onCollapseTask();
	}, []);

	const listeners = useMemo(
		() => [{ key: 'Escape', callback: collapseListener }],
		[],
	);

	useEffect(() => {
		registerListeners(listeners);

		return () => unregisterListeners(listeners);
	}, []);

	const reduceOpacity = props.selectedTask
		? props.selectedTask !== props.id
		: false;

	console.log({
		reduceOpacity,
		selectedTask: props.selectedTask,
		id: props.id,
	});

	return (
		<div ref={taskRef}>
			<div
				onDoubleClick={props.onExpandTask}
				className={clsx(
					'group px-1 transition-all flex items-start',
					props.view === TaskListItemView.Grid ? 'rounded-xl' : 'rounded',
					reduceOpacity && 'opacity-20 hover:opacity-100',
				)}>
				{props.view === TaskListItemView.Grid && (
					<GridTaskListItem
						{...props}
						deadline={deadline}
					/>
				)}
				<AnimatePresence>
					{(!props.view || props.view === TaskListItemView.List) &&
						(props.isSelected ? (
							<DetailedTaskListItem
								{...props}
								isChecked={props.complete}
								deadline={deadline}
								list={{ ...list }}
								onCheck={onCheck}
							/>
						) : (
							<DefaultTaskListItem
								{...props}
								isChecked={props.complete}
								deadline={deadline}
								list={{ ...list, progress: projectProgress }}
								onCheck={onCheck}
							/>
						))}
				</AnimatePresence>
				{props.view !== TaskListItemView.Grid && (
					<div className={cn('flex gap-2', props.isSelected ? 'py-6' : 'py-1')}>
						<motion.button
							transition={{ ease: 'easeIn', type: 'tween', duration: 0.1 }}
							layout="position">
							<SFSymbol
								name={props.isSelected ? 'pin.fill' : 'pin'}
								color={
									props.isSelected
										? iconColors.yellow
										: iconColors.labelTertiary
								}
							/>
						</motion.button>
					</div>
				)}
			</div>
		</div>
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
		<p className="flex items-center gap-2">
			{props.status === SnackTaskStatus.Todo && (
				<SFSymbol
					name="circle.dashed"
					color={iconColors.labelPrimary}
				/>
			)}
			{props.status === SnackTaskStatus.InProgress && (
				<SFSymbol
					name="circle.lefthalf.filled"
					color={iconColors.primary}
				/>
			)}
			{props.status === SnackTaskStatus.Complete && (
				<SFSymbol
					name="checkmark.circle.fill"
					color={iconColors.success}
				/>
			)}
			{props.status === SnackTaskStatus.Blocked && (
				<>
					<SFSymbol
						name="x.circle.fill"
						color={iconColors.danger}
					/>
				</>
			)}
			{props.status}
		</p>
	);
}

export const DeadlineBadge = (props: {
	deadline?: Date;
	status: SnackTaskStatus;
	id: string;
}) => {
	const deadlineHasPassed =
		props.deadline && props.status !== SnackTaskStatus.Complete
			? differenceInDays(new Date(), props.deadline) > 1
			: false;
	return (
		<p className="flex-shrink-0">
			{props.deadline && props.status !== SnackTaskStatus.Complete && (
				<>
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
						className={clsx(
							'py-0.5 font-semibold rounded px-1 flex gap-1 items-center text-sm mr-1',
							deadlineHasPassed
								? 'text-danger-11 bg-danger-4'
								: 'text-surface-12 bg-surface-6',
						)}>
						<SFSymbol
							name={
								deadlineHasPassed ? 'clock.badge.exclamationmark.fill' : 'alarm'
							}
							className="!w-5 !h-5"
							color={
								deadlineHasPassed ? iconColors.danger : iconColors.labelPrimary
							}
						/>
						{format(props.deadline, 'MMM d')}
					</motion.span>
				</>
			)}
		</p>
	);
};
