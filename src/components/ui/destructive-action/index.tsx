import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

type DestructiveActionButtonProps = {
	action: () => void;
	children: ReactNode;
	message: string;
};

const DestructiveActionButton = (props: DestructiveActionButtonProps) => {
	return (
		<Popover>
			<PopoverTrigger>{props.children}</PopoverTrigger>
			<PopoverContent className="p-4">
				{props.message}
				<div className="flex space-x-4 mt-2">
					<button
						onClick={props.action}
						className="bg-danger-11 text-white px-3 py-1 rounded-lg">
						Continue
					</button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default DestructiveActionButton;
