import React from 'react';

import useToggle from '../../../hooks/useToggle';
import { cn } from '../../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
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
			<PopoverTrigger>
				<button
					type={'button'}
					className="p-2 rounded-xl hover:bg-surface-4">
					<p
						className="flex items-center h-5 gap-4 font-semibold border-2 rounded-md aspect-square"
						style={{
							borderColor: `var(--${props.value}-10)`,
						}}></p>
				</button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="space-y-2">
					<div className="pb-2">
						<p className="font-semibold text-white">Choose a color</p>
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
									backgroundColor: `var(--${color}-10)`,
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
			</PopoverContent>
		</Popover>
	);
};

export default SelectColor;
