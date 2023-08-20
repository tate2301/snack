import { differenceInDays, format, startOfToday } from 'date-fns';
import useToggle from '../../../hooks/useToggle';
import { cn } from '../../../lib/utils';
import Popover from '../../ui/popover';
import Datepicker from '../../ui/datepicker';
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';

function AddDeadline(props: {
	selectDate: (date?: Date) => void;
	selectedDate?: Date;
}) {
	const [isOpen, toggle, setIsOpen] = useToggle(false);
	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<Popover.Trigger>
				<button
					type={'button'}
					className={cn(
						'p-2 rounded-xl items-center flex-shrink-0',
						props.selectedDate
							? differenceInDays(props.selectedDate, new Date()) > 0
								? 'bg-primary-4 text-primary-11 border-primary-6'
								: 'bg-danger-4 text-danger-11 border-primary-6'
							: 'bg-white border-surface-4 hover:bg-surface-3 hover:text-surface-11 hover:border-surface-6 text-surface-10',
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
								className="w-5 h-5"
							/>
						</>
					) : null}
				</button>
			</Popover.Trigger>
			<Popover.Content>
				<div className="p-2">
					<Datepicker
						value={props.selectedDate ?? startOfToday()}
						onChange={(date) => {
							props.selectDate(date);
							toggle();
						}}
					/>
				</div>
			</Popover.Content>
		</Popover>
	);
}

export default AddDeadline;
