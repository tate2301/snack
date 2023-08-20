import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import CalendarIcon from '../../icons/CalendarIcon';
import { SnackTask, SnackTaskStatus } from '../../redux/tasks/types';
import Textarea from '../ui/input/textarea';
import Modal from '../ui/modal';
import {
	CheckCircleIcon,
	ExclamationTriangleIcon,
	XCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import TargetIcon from '../../icons/TargetIcon';
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

type TaskExpandedViewProps = {
	isOpen: boolean;
	onClose: () => void;
} & SnackTask;

const TaskExpandedView = (props: TaskExpandedViewProps) => {
	const handleOnClose = () => {
		props.onClose();
	};

	const { changeStatus, onAddSubTask, onUpdateSubTask, onRemoveSubTask } =
		useTaskFunctions(props);

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={handleOnClose}>
			<div className="w-full space-y-8 font-normal text-surface-11">
				<div className="mb-2 space-y-4">
					<div className="flex items-center justify-between">
						<SelectStatus
							status={props.status}
							onChange={changeStatus}
						/>
						<div className="flex gap-2">
							<button className="p-2 hover:bg-surface-3 rounded-xl">
								<ArrowsExpand className="w-5 h-5" />
							</button>
							<button
								onClick={handleOnClose}
								className="p-2 hover:bg-surface-3 rounded-xl">
								<XMarkIcon className="w-5 h-5" />
							</button>
						</div>
					</div>
					<div>
						<h1 className="text-xl font-medium text-surface-12">
							{props.title}
						</h1>
						{props.description && <p>{props.description}</p>}
					</div>
				</div>
				<div className="mb-8 divide-y bg-surface-3 divide-surface-4 rounded-xl">
					<div className="flex gap-2 p-4 mt-4">
						<SnackTooltip>
							<TooltipTrigger>
								<button className="flex items-center gap-2 p-2 bg-white shadow-sm rounded-xl text-surface-10">
									<CalendarIcon className="w-5 h-5" />
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Add a deadline</p>
							</TooltipContent>
						</SnackTooltip>
						<SnackTooltip>
							<TooltipTrigger>
								<button className="flex items-center gap-2 p-2 bg-white shadow-sm rounded-xl text-surface-10">
									<div className="w-5 h-5 border-2 rounded-xl border-primary-10" />
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Transfer to list</p>
							</TooltipContent>
						</SnackTooltip>
						<SnackTooltip>
							<TooltipTrigger>
								<button className="flex items-center gap-2 p-2 bg-white shadow-sm rounded-xl text-surface-10">
									<TargetIcon className="w-5 h-5" />
									<p>In Progress</p>
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Change status</p>
							</TooltipContent>
						</SnackTooltip>
						<SnackTooltip>
							<TooltipTrigger>
								<button className="flex items-center gap-2 p-2 bg-white shadow-sm rounded-xl text-danger-11">
									<ExclamationTriangleIcon className="w-5 h-5" />
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Change priority</p>
							</TooltipContent>
						</SnackTooltip>
					</div>
				</div>

				<div className="mt-4 mb-8">
					<div className="flex flex-col gap-2">
						<SubTaskItem
							title="Add bookmarks control"
							id={generateUUID()}
							complete={true}
						/>
						<SubTaskItem
							title="Style the expanded task view"
							id={generateUUID()}
							complete={false}
						/>
						<SubTaskItem
							title="Allow users to add and update subtask items at will"
							id={generateUUID()}
							complete={true}
						/>
					</div>
					<button className="p-2 px-2 mt-4 font-medium bg-transparent rounded-xl hover:bg-surface-4">
						<PlusIcon className="w-5 h-5" />
						Add a subtask
					</button>
				</div>

				<div className="flex gap-4">
					<button className="px-4 py-2 rounded-xl bg-danger-4 text-danger-11">
						<TrashIcon className="w-5 h-5" />
						Move to trash
					</button>
				</div>
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
			<SelectTrigger className="text-surface-12 !font-normal bg-surface-3">
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
