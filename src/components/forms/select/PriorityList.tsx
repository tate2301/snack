import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import SnoozeIcon from '../../../assets/icons/Snooze';
import TomorrowIcon from '../../../assets/icons/TomorrowIcon';
import * as HighPriorityFlagIcon from '../../../assets/icons/FlagIcon';
import BacklogIcon from '../../../assets/icons/BacklogIcon';
import { FlagIcon } from '@heroicons/react/24/outline';

const priorities = [
	{ id: 'Urgent', icon: <BacklogIcon className="w-5 h-5" /> },
	{ id: 'High', icon: <HighPriorityFlagIcon.default className="w-5 h-5" /> },
	{ id: 'Low', icon: <FlagIcon className="w-5 h-5" /> },
	{ id: 'Maybe', icon: <TomorrowIcon className="w-5 h-5" /> },
	{ id: 'Snoozed', icon: <SnoozeIcon className="w-5 h-5" /> },
];

const PriorityList = (props: {
	priority?: string;
	onChange: (val: string) => void;
}) => {
	return (
		<Select
			defaultValue={priorities[2].id}
			onValueChange={props.onChange}>
			<SelectTrigger className="min-w-[120px] !w-full text-surface-12 p-2">
				<div className="flex gap-4">
					<SelectValue placeholder={'No priority selected'} />
				</div>
			</SelectTrigger>
			<SelectContent>
				{priorities.map((priority) => (
					<SelectItem
						key={priority.id}
						value={priority.id}
						className="flex">
						<p className="flex items-center gap-4">
							{priority.icon && priority.icon}
							{priority.id}
						</p>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default PriorityList;
