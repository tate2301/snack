import { format, startOfToday } from 'date-fns';
import useToggle from '../../hooks/useToggle';
import { cn } from '../../lib/utils';
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Datepicker from '../ui/datepicker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

function AddDeadline(props: {
	selectDate: (date?: Date) => void;
	selectedDate?: Date;
}) {
	const [isOpen, toggle, setIsOpen] = useToggle(false);
	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<PopoverTrigger>
				<button
					type={'button'}
					className={cn(
						'p-2 rounded-xl items-center flex-shrink-0 w-full',
						'bg-white border-surface-4 hover:bg-surface-3 hover:text-surface-12 hover:border-surface-6 text-surface-10',
					)}>
					<CalendarDaysIcon className="w-6 h-6" />
					{props.selectedDate ? (
						<>
							{format(props.selectedDate, 'dd MMM yyyy')}
							<XMarkIcon
								onClick={(e) => {
									props.selectDate(undefined);
									e.stopPropagation();
								}}
								className="w-5 h-5 ml-auto"
							/>
						</>
					) : null}
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
