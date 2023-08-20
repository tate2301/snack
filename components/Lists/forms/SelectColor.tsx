import useToggle from '../../../hooks/useToggle';
import { cn } from '../../../lib/utils';
import Popover from '../../ui/popover';
import { colors } from '../constants';

const SelectColor = (props: {
	value: string;
	onChange: (color: string) => void;
}) => {
	const [isOpened, toggle, onChange] = useToggle(false);
	return (
		<Popover
			open={isOpened}
			onOpenChange={(open) => onChange(open)}>
			<Popover.Trigger>
				<button
					type={'button'}
					className="p-2 rounded-xl hover:bg-surface-4">
					<p
						className="flex items-center h-5 gap-4 font-medium border-2 rounded-md aspect-square"
						style={{
							borderColor: `#${props.value}`,
						}}></p>
				</button>
			</Popover.Trigger>
			<Popover.Content>
				<div className="space-y-2">
					<div className="pb-2">
						<p className="font-medium text-white">Choose a color</p>
					</div>
					<div className="grid grid-cols-8 gap-4 w-fit">
						{colors.map((color) => (
							<button
								key={color}
								onClick={() => {
									props.onChange(color);
									toggle();
								}}
								style={{
									backgroundColor: `#${color}`,
								}}
								className={cn(
									'rounded-lg',
									props.value === color &&
										'hover:ring-2 ring-offset-2 ring-offset-surface-12 ring-surface-6',
								)}>
								<div className="w-4 h-4 rounded-xl" />
							</button>
						))}
					</div>
				</div>
			</Popover.Content>
		</Popover>
	);
};

export default SelectColor;
