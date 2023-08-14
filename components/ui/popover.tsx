import { XMarkIcon } from '@heroicons/react/24/outline';
import * as RadixPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';

const Popover = (props: { children: ReactNode }) => (
	<RadixPopover.Root>{props.children}</RadixPopover.Root>
);

const Content = (props: { children: ReactNode; noClose?: boolean }) => (
	<RadixPopover.Portal>
		<RadixPopover.Content
			className="rounded-xl p-4 w-[260px] bg-white shadow-xl border border-surface-2 -translate-x-4"
			sideOffset={4}>
			{!props.noClose && <Popover.Close />}
			{props.children}
			<RadixPopover.Arrow className="fill-white" />
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
