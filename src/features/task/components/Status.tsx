import { SnackTaskStatus } from '../../../redux/tasks/types';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../components/ui/select';
import TodoIcon from '../../../assets/icons/TodoIcon';
import InProgressIcon from '../../../assets/icons/InProgressIcon';

const TaskStatus = (props: {
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

export default TaskStatus;
