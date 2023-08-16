import { ReactNode } from 'react';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import { useAnimate } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { useAppDispatch } from '../../redux/store';
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
	ArchiveBoxIcon,
	PencilIcon,
	Square2StackIcon,
	SunIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import CalendarIcon from '../../icons/CalendarIcon';
import useDisclosure from '../../hooks/useDisclosure';
import TaskExpandedView from './TaskExpandedView';
import { generateUUID } from '../../lib/functions';
import { addEvent } from '../../redux/events';
import TargetIcon from '../../icons/TargetIcon';
import { motion } from 'framer-motion';
import PostItNoteIcon from '../../icons/PostItNoteIcon';
import InProgressIcon from '../../icons/InProgressIcon';
import ArrowsExpand from '../../icons/ArrowsExpand';

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
					<button className="p-1 text-surface-12 hover:bg-surface-3 rounded-xl transition-all group-hover:opacity-100 opacity-0">
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

export default function TaskListItem(props: SnackTask & { icon?: ReactNode }) {
	const dispatch = useAppDispatch();
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
			<div
				className={clsx(
					'justify-between flex',
					isOpen ? 'items-start' : 'items-center',
				)}>
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
						onClick={onToggle}>
						<p
							className={clsx(
								'flex-1 line-clamp-1',
								isChecked ? 'line-through text-zinc-400 ' : 'text-surface-12',
							)}>
							{props.title}
						</p>
						<div className="flex gap-4 mt-1">
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
							<div className="flex gap-2">
								<p className="p-0.5 px-1 text-sm rounded bg-surface-3">
									#work-related
								</p>
								<p className="p-0.5 px-1 text-sm rounded bg-surface-3">
									#personal
								</p>
							</div>
						</div>
						{isOpen && (
							<motion.div className="py-2 flex flex-col gap-2">
								<p className="text-surface-12">
									Very excited to have built something inspiring to other
									developers, I hope they keep using it. It really is my source
									of pride if we are being honest! We allow you to Share your
									portfolio, send invoices, and complete projects to unlock
									trends to optimize your business growth.
								</p>
								<div className="flex gap-4 items-center">
									<button className="flex gap-2 items-center text-surface-12 px-2 py-1 font-normal rounded-xl bg-surface-3">
										<InProgressIcon className="w-5 h-5" />
										In progress
									</button>
									<button className="flex gap-2 items-center text-surface-12 px-2 py-1 font-normal rounded-xl bg-surface-3">
										<p className="flex gap-4 items-center">
											<span
												style={{
													borderColor: `var(--blue-10)`,
												}}
												className="w-4 h-4 border-2 rounded-md"
											/>
										</p>
										Personal
									</button>
									<SetReminderButton />
								</div>
							</motion.div>
						)}
					</div>
				</div>
				<div className="flex gap-2 items-center ">
					{!isOpen && (
						<>
							{props.description && (
								<PostItNoteIcon className="w-5 h-5 text-surface-8" />
							)}
							<p className="flex gap-4 items-center mx-2">
								<span
									style={{
										borderColor: `var(--blue-10)`,
									}}
									className="w-4 h-4 border-2 rounded-md"
								/>
							</p>
						</>
					)}
					<TaskDropdownOptions
						{...props}
						id={props.id}
					/>
					{isOpen && (
						<>
							<button className="flex gap-2 items-center p-2 font-normal rounded-xl hover:bg-surface-3">
								<ArrowsExpand className="w-4 h-4" />
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

const SetReminderButton = () => {
	return (
		<Dropdown>
			<Dropdown.Trigger>
				<button className="flex gap-2 items-center text-surface-12 px-2 py-1 font-normal rounded-xl bg-surface-3">
					<BellIcon className="w-5 h-5" />
					Set reminder
				</button>
			</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.Item>
					<div className="flex items-center gap-4 w-64 text-surface-12">
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
					<div className="flex items-center gap-4 w-64 text-surface-12">
						<CalendarIcon className="w-5 h-5" />
						<p className="flex-1">Tomorrow</p>
						<p>
							{format(add(startOfToday(), { days: 1, hours: 9 }), 'EEE HH:MM')}
						</p>
					</div>
				</Dropdown.Item>
				<Dropdown.Item>
					<div className="flex items-center gap-4 w-64 text-surface-12">
						<CalendarDaysIcon className="w-5 h-5" />
						<p className="flex-1">Pick Date & Time</p>
					</div>
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	);
};
