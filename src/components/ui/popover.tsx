import React from 'react';

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
	<RadixPopover.Content
		asChild
		align="start"
		side="bottom"
		className="z-50 shadow-xl rounded-xl w-fit"
		sideOffset={-5}>
		<div className="border-surface-6 flex justify-between min-w-[2rem] space-x-4 bg-surface-12 text-surface-1 p-2 transition-all z-50 shadow-xl rounded-xl items-start">
			<div className="p-2">{props.children}</div>
			<Close />
		</div>
	</RadixPopover.Content>
);

const Trigger = (props: { children: ReactNode }) => (
	<RadixPopover.Trigger asChild>{props.children}</RadixPopover.Trigger>
);

const Close = () => (
	<RadixPopover.Close
		className="inline-flex items-center justify-center rounded-full outline-none cursor-default hover:bg-surface-11 hover:text-white mt-1"
		aria-label="Close">
		<XMarkIcon className="w-5 h-5" />
	</RadixPopover.Close>
);

Popover.Content = Content;
Popover.Trigger = Trigger;
Popover.Close = Close;

export default Popover;
