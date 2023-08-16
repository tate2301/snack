import { XMarkIcon } from '@heroicons/react/24/outline';
import * as RadixPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';

const Popover = (props: {
	children: ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) => {
	if (props.onOpenChange) {
		return (
			<RadixPopover.Root
				open={props.open}
				onOpenChange={props.onOpenChange}>
				{props.children}
			</RadixPopover.Root>
		);
	}

	return <RadixPopover.Root>{props.children}</RadixPopover.Root>;
};

const Content = (props: { children: ReactNode; noClose?: boolean }) => (
	<RadixPopover.Portal>
		<RadixPopover.Content
			asChild
			align="start"
			side="bottom"
			className="rounded-xl p-4 w-fit transition-all border-surface-6 bg-white shadow-xl border"
			sideOffset={-5}>
			{props.children}
		</RadixPopover.Content>
	</RadixPopover.Portal>
);

const Trigger = (props: { children: ReactNode }) => (
	<RadixPopover.Trigger asChild>{props.children}</RadixPopover.Trigger>
);

const Close = () => (
	<div className="flex w-full mb-4 justify-end">
		<RadixPopover.Close
			className="rounded-full inline-flex items-center justify-center top-1 right-1 outline-none cursor-default"
			aria-label="Close">
			<XMarkIcon className="w-6 h-6" />
		</RadixPopover.Close>
	</div>
);

Popover.Content = Content;
Popover.Trigger = Trigger;
Popover.Close = Close;

export default Popover;
