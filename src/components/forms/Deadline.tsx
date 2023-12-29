import { format, startOfToday } from 'date-fns';
import useToggle from '../../lib/hooks/useToggle';
import { cn } from '../../lib/utils';
import Datepicker from '../ui/datepicker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import SFSymbol from '../../assets/icons/SFSymbol';
import { ReactNode } from 'react';

function AddDeadline(props: {
	selectDate: (date?: Date) => void;
	selectedDate?: Date;
	children?: ReactNode;
}) {
	const [isOpen, toggle, setIsOpen] = useToggle(false);
	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<PopoverTrigger
				className={cn(
					'rounded-lg items-center flex-shrink-0 w-full text-surface-12 px-0',
					!props.children && 'border-surface-4 text-surface-10 py-0.5 px-2',
				)}>
				{!props.children && (
					<>
						<SFSymbol
							name="calendar"
							color={'#121212'}
							className="w-5 h-5"
						/>
						{props.selectedDate ? (
							<>
								{format(props.selectedDate, 'dd MMMM yyyy')}
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
					</>
				)}
				{props.children}
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
