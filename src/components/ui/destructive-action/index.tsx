import { ReactNode } from 'react';
import Popover from '../popover';

type DestructiveActionButtonProps = {
	action: () => void;
	children: ReactNode;
	message: string;
};

const DestructiveActionButton = (props: DestructiveActionButtonProps) => {
	return (
		<Popover>
			<Popover.Trigger>{props.children}</Popover.Trigger>
			<Popover.Content>
				{props.message}
				<div className="flex space-x-4 mt-2">
					<button
						onClick={props.action}
						className="bg-danger-11 text-white px-3 py-1 rounded-lg">
						Continue
					</button>
				</div>
			</Popover.Content>
		</Popover>
	);
};

export default DestructiveActionButton;
