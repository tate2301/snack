import { SnackTask, SnackTaskStatus } from '../../../redux/tasks/types';
import Textarea from '../../../components/ui/input/textarea';
import Modal from '../../../components/ui/modal';
import {
	CheckCircleIcon,
	XCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { generateUUID } from '../../../lib/functions';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../components/ui/select';
import TodoIcon from '../../../assets/icons/TodoIcon';
import InProgressIcon from '../../../assets/icons/InProgressIcon';
import useTaskFunctions from './hooks/useTaskFunctions';
import ArrowsExpand from '../../../assets/icons/ArrowsExpand';
import SnackTooltip, {
	TooltipContent,
	TooltipTrigger,
} from '../../../components/ui/tooltip';
import ProjectList from '../../../components/forms/select/ProjectsList';
import AddDeadline from '../../../components/forms/Deadline';
import { parseISO } from 'date-fns';
import { useAppDispatch } from '../../../redux/store';
import { addSubtask, deleteSubtask, updateSubtask } from '../../../redux/tasks';
import { useCallback, useEffect, useRef } from 'react';
import SFSymbol from '../../../assets/icons/SFSymbol';
import { useKeyboardListeners } from '../../../context/KeyboardNavigationContext';
import Divider from '../../../components/ui/divider/Divider';

type TaskExpandedViewProps = {
	isOpen: boolean;
	onClose: () => void;
} & SnackTask;

const TaskExpandedView = (props: TaskExpandedViewProps) => {
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

	const titleRef = useRef(props.title);

	const handleOnClose = () => {
		console.log(titleRef);
		if (props.title === '') onTitleChange(null, titleRef.current);
		props.onClose();
	};

	useEffect(() => {
		if (!titleRef.current) titleRef.current = props.title;
	}, [props.title]);

	return (
		<Modal
			noPadding
			isOpen={props.isOpen}
			onClose={handleOnClose}>
			<div className="w-full text-base font-normal text-surface-11 max-h-[60vh] overflow-y-auto overflow-x-visible">
				<div className="z-30 sticky top-0 bg-white rounded-2xl">
					<div className="flex justify-between p-2 border-b border-surface-4">
						<div className="flex items-start gap-4">
							<p className="rounded-xl">
								<SelectStatus
									status={props.status}
									onChange={changeStatus}
								/>
							</p>
							<p className="rounded-xl">
								<ProjectList
									defaultListId={list.id}
									onChange={changeList}
								/>
							</p>
						</div>
						<SnackTooltip>
							<TooltipTrigger>
								<button
									onClick={handleOnClose}
									className="rounded-xl p-0">
									<SFSymbol
										name="xmark.circle.fill"
										color={'#404040'}
									/>
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Close</p>
							</TooltipContent>
						</SnackTooltip>
					</div>
				</div>

				<div className="p-2">
					<Textarea
						name={'title'}
						onChange={onTitleChange}
						value={props.title}
						className="p-2 text-xl w-full outline-none ring-0 font-semibold text-surface-12 my-0"
					/>
					<Textarea
						value={props.description}
						onChange={onDescriptionChange}
						name={'description'}
						placeholder="Add a description"
						className={
							'outline-none ring-0 flex-1 text-surface-10 w-full font-semibold p-2 my-0'
						}
					/>
				</div>
				<div className="flex items-center gap-2 p-4">
					<p className="rounded-xl bg-surface-4">
						<AddDeadline
							selectDate={onDeadlineChanged}
							selectedDate={
								typeof props.deadline === 'string'
									? parseISO(props.deadline)
									: props.deadline
							}
						/>
					</p>
				</div>

				<div className="p-4">
					<TaskChecklist {...props} />
				</div>
			</div>
		</Modal>
	);
};

export const TaskChecklist = (props: SnackTask) => {
	const dispatch = useAppDispatch();
	const { registerListeners, unregisterListeners } = useKeyboardListeners();

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

	const checklistListener = () => {
		if (props.subtasks.length === 0) {
			onAddNewItem();
		}
	};

	useEffect(() => {
		const listener = [{ key: 'i', callback: checklistListener }];
		registerListeners(listener);
		return () => unregisterListeners(listener);
	}, [registerListeners, unregisterListeners]);

	return (
		<div className={'py-4'}>
			<p className="subheadline text-surface-10 mb-2">
				Checklist ({props.subtasks?.length})
			</p>

			{props.subtasks?.length === 0 && (
				<div>
					<button
						onClick={onAddChecklist}
						className="px-0 py-1 pr-4 rounded-lg font-semibold transition-all">
						<SFSymbol
							name="plus.square.fill.on.square.fill"
							color={'#808080'}
						/>
						Add checklist item
					</button>
				</div>
			)}
			{props.subtasks?.length !== 0 && (
				<div className="flex flex-col gap-2">
					{props.subtasks?.map((subtask) => (
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
