import { PlusIcon } from '@heroicons/react/20/solid';
import {
	SnackTask,
	SnackTaskPriority,
	SnackTaskStatus,
} from '../../redux/tasks/types';
import Textarea from '../ui/input/textarea';
import Modal from '../ui/modal';
import {
	CheckCircleIcon,
	ExclamationTriangleIcon,
	ListBulletIcon,
	XCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { generateUUID } from '../../lib/functions';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import TodoIcon from '../../icons/TodoIcon';
import InProgressIcon from '../../icons/InProgressIcon';
import useTaskFunctions from './hooks/useTaskFunctions';
import ArrowsExpand from '../../icons/ArrowsExpand';
import SnackTooltip, { TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ProjectList from '../misc/lists/ProjectsList';
import AddDeadline from '../forms/Deadline';
import { parseISO } from 'date-fns';
import { useAppDispatch } from '../../redux/store';
import { addSubtask, deleteSubtask, updateSubtask } from '../../redux/tasks';
import { useCallback, useEffect, useRef } from 'react';

type TaskExpandedViewProps = {
	isOpen: boolean;
	onClose: () => void;
} & SnackTask;

const TaskExpandedView = (props: TaskExpandedViewProps) => {
	const handleOnClose = () => {
		props.onClose();
	};

	const {
		changeStatus,
		onUpdateTask,
		changeList,
		openInPage,
		list,
		onDeadlineChanged,
		onTitleChange,
		onDescriptionChange,
	} = useTaskFunctions(props);

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={handleOnClose}>
			<div className="w-full text-base font-normal text-surface-11 max-h-[60vh] overflow-y-auto overflow-x-visible">
				<div className="pb-1 z-30 sticky top-0 bg-white">
					<div className="flex items-center justify-between">
						<div className="flex gap-4">
							<SelectStatus
								status={props.status}
								onChange={changeStatus}
							/>
							<ProjectList
								defaultListId={list.id}
								onChange={changeList}
							/>
						</div>
						<div className="flex gap-2">
							<SnackTooltip>
								<TooltipTrigger>
									<button
										onClick={openInPage}
										className="p-2 hover:bg-surface-3 rounded-xl">
										<ArrowsExpand className="w-5 h-5" />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Open as page</p>
								</TooltipContent>
							</SnackTooltip>
							<SnackTooltip>
								<TooltipTrigger>
									<button
										onClick={handleOnClose}
										className="p-2 hover:bg-surface-3 rounded-xl">
										<XMarkIcon className="w-5 h-5" />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Close</p>
								</TooltipContent>
							</SnackTooltip>
						</div>
					</div>
					<div>
						<Textarea
							name={'title'}
							onChange={onTitleChange}
							value={props.title}
							className="p-2 text-xl w-full outline-none ring-0 font-semibold text-surface-12"
						/>
					</div>
				</div>
				<div className="p-2">
					<Textarea
						value={props.description}
						onChange={onDescriptionChange}
						name={'description'}
						placeholder="Add a description"
						className="w-full p-2 bg-transparent outline-none focus:outline-2 rounded-xl focus:shadow-inner focus:outline-primary-10"
					/>
				</div>
				<div className="flex items-center gap-2 py-4">
					<AddDeadline
						selectDate={onDeadlineChanged}
						selectedDate={
							typeof props.deadline === 'string'
								? parseISO(props.deadline)
								: props.deadline
						}
					/>
				</div>

				<TaskChecklist {...props} />
				<div className="flex gap-4"></div>
			</div>
		</Modal>
	);
};

export const TaskChecklist = (props: SnackTask) => {
	const dispatch = useAppDispatch();

	const onAddChecklist = () => {
		onAddNewItem();
	};

	const onChange = (data) => {
		dispatch(
			updateSubtask({
				...data,
				taskId: props.id,
			}),
		);
	};

	const onAddNewItem = () => {
		dispatch(
			addSubtask({
				id: props.id,
				subtask: {
					id: generateUUID(),
					title: '',
					complete: false,
				},
			}),
		);
	};

	const onDelete = (id: string) => {
		dispatch(
			deleteSubtask({
				id: props.id,
				subtaskId: id,
			}),
		);
	};

	return (
		<div className="py-4">
			<h2 className="flex items-center gap-2 mb-4 text-surface-10">
				<ListBulletIcon className="w-5 h-5" />
				Subtask queue ({props.subtasks.length})
			</h2>
			{props.subtasks.length === 0 && (
				<button
					onClick={onAddChecklist}
					className="px-4 py-1 rounded-xl border border-zinc-400/30 shadow-sm hover:bg-surface-1">
					<PlusIcon className="w-5 h-5" />
					Add an item
				</button>
			)}
			{props.subtasks.length !== 0 && (
				<>
					<div className="flex flex-col gap-2">
						{props.subtasks.map((subtask) => (
							<SubTaskItem
								key={subtask.id}
								title={subtask.title}
								id={subtask.id}
								complete={subtask.complete}
								onChange={onChange}
								onDelete={onDelete}
								onNewLine={onAddNewItem}
							/>
						))}
					</div>
					<button
						onClick={onAddNewItem}
						className="py-1 px-4 mt-4 font-semibold rounded-xl border border-zinc-400/30 shadow-sm bg-white hover:bg-surface-1">
						<PlusIcon className="w-5 h-5" />
						Add an item
					</button>
				</>
			)}
		</div>
	);
};

export const SubTaskItem = (props: {
	title: string;
	complete: boolean;
	id: string;
	onChange: (task) => void;
	onDelete: (id) => void;
	onNewLine: () => void;
}) => {
	const ref = useRef<HTMLTextAreaElement>(null);

	const keydownListener = useCallback(
		(event) => {
			if (event.key === 'Backspace' && !props.title) {
				props.onDelete(props.id);
			}

			if (event.key === 'Enter') {
				props.onNewLine();
				event.preventDefault();
				event.stopPropagation();
			}
		},
		[props.title, ref.current],
	);

	useEffect(() => {
		if (ref.current) {
			ref.current.addEventListener('keydown', keydownListener);
		}

		return () => ref.current?.removeEventListener('keydown', keydownListener);
	}, [ref.current, keydownListener]);

	return (
		<div className="flex items-center gap-2">
			<input
				className="!rounded-full !h-5 !w-5 flex-shrink-0"
				type="checkbox"
				checked={props.complete}
				onChange={(e) =>
					props.onChange({
						...props,
						complete: e.target.checked,
					})
				}
			/>
			<Textarea
				className="font-normal text-surface-12 outline-none flex-1 bg-transparent"
				value={props.title}
				placeholder="Task title"
				name="subtask-title"
				autoFocus
				setRef={ref}
				onChange={(e) => {
					props.onChange({
						...props,
						title: e.target.value,
					});
				}}
			/>
		</div>
	);
};

export const SelectStatus = (props: {
	status: SnackTaskStatus;
	onChange: (status: SnackTaskStatus) => void;
}) => {
	return (
		<Select
			defaultValue={props.status ?? SnackTaskStatus.Todo}
			onValueChange={props.onChange}>
			<SelectTrigger className="text-surface-12">
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

export default TaskExpandedView;
