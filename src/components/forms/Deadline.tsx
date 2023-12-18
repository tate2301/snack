import { format, startOfToday } from 'date-fns';
import useToggle from '../../lib/hooks/useToggle';
import { cn } from '../../lib/utils';
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Datepicker from '../ui/datepicker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MinusCircleIcon } from '@heroicons/react/20/solid';
import SFSymbol from '../../assets/icons/SFSymbol';

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
					'py-0.5 px-2 rounded-lg items-center flex-shrink-0 w-full text-surface-12',
					'border-surface-4 text-surface-10',
				)}>
				<button type="button">
					<SFSymbol
						name="calendar"
						color={'#121212'}
						className="w-5 h-5"
					/>
					{props.selectedDate ? (
						<>
							{format(props.selectedDate, 'dd MMM yyyy')}
							<SFSymbol
								name={'minus.circle.fill'}
								onClick={(e) => {
									props.selectDate(undefined);
									e.stopPropagation();
								}}
								color={'#808080'}
								className="!w-5 !h-5"
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
