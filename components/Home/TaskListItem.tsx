import { ReactNode } from 'react';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import { useAnimate } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { useAppDispatch } from '../../redux/store';
import { addTask, updateTask } from '../../redux/tasks';
import { SnackTask, SnackTaskStatus } from '../../redux/tasks/types';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import Dropdown from '../ui/dropdown-menu';
import {
	ArchiveBoxIcon,
	PencilIcon,
	Square2StackIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import CalendarIcon from '../../icons/CalendarIcon';
import useDisclosure from '../../hooks/useDisclosure';
import TaskExpandedView from './TaskExpandedView';
import { generateUUID } from '../../lib/functions';
import { addEvent } from '../../redux/events';

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
					<button className="p-1 text-surface-10 bg-surface-3 rounded-lg transition-all group-hover:opacity-100 opacity-0">
						<EllipsisVerticalIcon className="w-6 h-6" />
					</button>
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Item onClick={handleOnDuplicate}>
						<Square2StackIcon className="w-5 h-5" />
						Duplicate
					</Dropdown.Item>
					<Dropdown.Item>
						<CalendarIcon className="w-5 h-5" />
						Create event
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

export default function TaskListItem(props: SnackTask & { icon?: ReactNode }) {
	const dispatch = useAppDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isChecked, toggle] = useToggle(props.complete);
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: props.id,
		});

	let [ref, animate] = useAnimate();

	const onCheck = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.cancelBubble = true;
		e.stopImmediatePropagation();

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
				'flex relative items-center justify-between px-4 py-2 bg-white rounded-xl group',
				isDragging && 'z-40 shadow-xl',
			)}>
			<TaskExpandedView
				{...props}
				isOpen={isOpen}
				onClose={onClose}
			/>
			<div
				ref={ref}
				className="flex items-start flex-1">
				<input
					className="rounded-xl  flex-shrink-0"
					type="checkbox"
					onChange={onCheck}
					checked={isChecked}
				/>
				<div
					className="flex-1 h-full"
					onClick={onOpen}>
					<p
						className={clsx(
							'flex-1 line-clamp-1',
							isChecked ? 'line-through text-zinc-400 ' : 'text-zinc-900',
						)}>
						{props.title}
					</p>
					<div>
						{props.deadline && (
							<span
								className={
									'p-0.5 rounded bg-surface-4 text-surface-10 px-1 text-sm font-semibold'
								}>
								{format(props.deadline, 'MMM dd')}
							</span>
						)}
					</div>
				</div>
			</div>
			<TaskDropdownOptions
				{...props}
				id={props.id}
			/>
		</div>
	);
}
