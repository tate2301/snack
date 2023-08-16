import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import CalendarIcon from '../../icons/CalendarIcon';
import { SnackTask } from '../../redux/tasks/types';
import Textarea from '../ui/input/textarea';
import Modal from '../ui/modal';
import Tooltip from '../ui/tooltip';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import TargetIcon from '../../icons/TargetIcon';

type TaskExpandedViewProps = {
	isOpen: boolean;
	onClose: () => void;
} & SnackTask;

const TaskExpandedView = (props: TaskExpandedViewProps) => {
	const handleOnClose = () => {
		props.onClose();
	};
	return (
		<Modal
			isOpen={props.isOpen}
			onClose={handleOnClose}>
			<div className="w-[40rem]">
				<div className="flex gap-2 items-center mb-8">
					<input
						className="rounded-xl flex-shrink-0"
						type="checkbox"
					/>
					<h1 className="text-xl text-surface-11 line-clamp-1">
						{props.title}
					</h1>
				</div>
				<div className="mb-8 bg-surface-3 divide-surface-4 rounded-xl divide-y">
					<Textarea
						name={'description'}
						className="w-full bg-transparent !outline-none p-4"
						placeholder="Add a description"
					/>

					<div className="flex gap-2 mt-4 p-4">
						<Tooltip content="Add a deadline">
							<button className="flex items-center gap-2 p-2 rounded-xl bg-white shadow-sm text-surface-10">
								<CalendarIcon className="w-5 h-5" />
							</button>
						</Tooltip>
						<Tooltip content="Add a deadline">
							<button className="flex items-center gap-2 p-2 rounded-xl bg-white shadow-sm text-surface-10">
								<div className="w-5 h-5 rounded-xl border-2 border-primary-10" />
							</button>
						</Tooltip>
						<Tooltip content="Add a deadline">
							<button className="flex items-center gap-2 p-2 rounded-xl bg-white shadow-sm text-surface-10">
								<TargetIcon className="w-5 h-5" />
								<p>In Progress</p>
							</button>
						</Tooltip>
						<Tooltip content="Add a deadline">
							<button className="flex items-center gap-2 p-2 rounded-xl bg-white shadow-sm text-danger-11">
								<ExclamationTriangleIcon className="w-5 h-5" />
							</button>
						</Tooltip>
					</div>
				</div>

				<div className="mb-8 mt-4">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<input
								className="!rounded-full flex-shrink-0"
								type="checkbox"
							/>
							<p>Add bookmarks control</p>
						</div>
					</div>
					<button className="font-semibold p-2 px-2 rounded-xl bg-transparent hover:bg-surface-4 mt-4">
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

export default TaskExpandedView;
