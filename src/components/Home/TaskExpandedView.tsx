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
import { useTaskFunctions } from './TaskListItem';
import ArrowsExpand from '../../icons/ArrowsExpand';
import SnackTooltip, { TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useNavigate } from 'react-router-dom';
import SelectList from '../create/SelectList';
import AddDeadline from '../create/task/AddDeadline';

type TaskExpandedViewProps = {
	isOpen: boolean;
	onClose: () => void;
} & SnackTask;

const TaskExpandedView = (props: TaskExpandedViewProps) => {
	const navigate = useNavigate();

	const handleOnClose = () => {
		props.onClose();
	};

	const {
		changeStatus,
		onAddSubTask,
		onUpdateSubTask,
		onRemoveSubTask,
		onUpdateTask,
		changeList,
		list,
	} = useTaskFunctions(props);

	const openInPage = () => navigate(`/task/${props.id}`);

	const onDescriptionChange = (e) => {
		const value = e.target.value;
		onUpdateTask({
			...props,
			description: value,
		});
	};

	const onTitleChange = (e) => {
		const value = e.target.value;
		onUpdateTask({
			...props,
			title: value,
		});
	};

	const onDeadlineChanged = (date: Date) => {
		onUpdateTask({
			...props,
			deadline: date,
		});
	};

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={handleOnClose}>
			<div className="w-full text-base font-normal text-surface-11">
				<div className="pb-4">
					<div className="flex items-center justify-between">
						<div className="flex gap-4">
							<SelectStatus
								status={props.status}
								onChange={changeStatus}
							/>
							<SelectList
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
						<input
							onChange={onTitleChange}
							value={props.title}
							className="p-2 text-xl w-full outline-none ring-0 font-medium text-surface-12"
						/>
						<Textarea
							value={props.description}
							onChange={onDescriptionChange}
							name={'description'}
							placeholder="Add a description"
							className="w-full p-2 bg-transparent outline-none focus:outline-2 rounded-xl focus:shadow-inner focus:outline-primary-10"
						/>
					</div>
				</div>
				<div className="flex items-center gap-2 py-4">
					<AddDeadline
						selectDate={onDeadlineChanged}
						selectedDate={props.deadline}
					/>

					<SnackTooltip>
						<TooltipTrigger>
							<button className="flex items-center gap-2 p-2 rounded-xl text-danger-11 bg-danger-4">
								<ExclamationTriangleIcon className="w-5 h-5" />
								{SnackTaskPriority.Urgent}
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Change priority</p>
						</TooltipContent>
					</SnackTooltip>
				</div>

				<div className="py-4">
					<h2 className="flex items-center gap-2 mb-2 font-medium">
						<ListBulletIcon className="w-5 h-5" />
						Checklist
					</h2>
					<div className="flex flex-col gap-2">
						<SubTaskItem
							title="Dialog should be triggered in the list parent, only when an ID is set"
							id={generateUUID()}
							complete={true}
						/>
						<SubTaskItem
							title="Child requesting to launch dialog should provide their ID"
							id={generateUUID()}
							complete={true}
						/>
						<SubTaskItem
							title="Dialog should only close as a side-effect of unsetting the ID"
							id={generateUUID()}
							complete={false}
						/>
					</div>
					<button className="p-2 px-2 mt-4 font-medium bg-transparent rounded-xl hover:bg-surface-4">
						<PlusIcon className="w-5 h-5" />
						Add an item
					</button>
				</div>

				<div className="flex gap-4"></div>
			</div>
		</Modal>
	);
};

const SubTaskItem = (props: {
	title: string;
	complete: boolean;
	id: string;
}) => {
	return (
		<div className="flex items-center gap-2">
			<input
				className="!rounded-full !h-5 !w-5 flex-shrink-0"
				type="checkbox"
				checked={props.complete}
			/>
			<p className="font-normal text-surface-11">{props.title}</p>
		</div>
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
