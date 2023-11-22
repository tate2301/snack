import { format, startOfToday } from 'date-fns';
import useToggle from '../../hooks/useToggle';
import { cn } from '../../lib/utils';
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Datepicker from '../ui/datepicker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MinusCircleIcon } from '@heroicons/react/20/solid';

function AddDeadline(props: {
	selectDate: (date?: Date) => void;
	selectedDate?: Date;
}) {
	const [isOpen, toggle, setIsOpen] = useToggle(false);
	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<PopoverTrigger
				className={cn(
					'py-0.5 px-2 rounded-lg items-center flex-shrink-0 w-full text-sm',
					'bg-white border-surface-4 text-surface-10',
				)}>
				<button>
					<CalendarDaysIcon className="w-5 h-5" />
					{props.selectedDate ? (
						<>
							{format(props.selectedDate, 'dd MMM yyyy')}
							<MinusCircleIcon
								onClick={(e) => {
									props.selectDate(undefined);
									e.stopPropagation();
								}}
								className="w-5 h-5 ml-2"
							/>
						</>
					) : (
						'When'
					)}
				</button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="p-2">
					<Datepicker
						value={props.selectedDate ?? startOfToday()}
						onChange={(date) => {
							props.selectDate(date);
							toggle();
						}}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default AddDeadline;
