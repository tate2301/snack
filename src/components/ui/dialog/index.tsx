import React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
	className,
	...props
}: DialogPrimitive.DialogPortalProps) => (
	<DialogPrimitive.Portal
		className={clsx(className)}
		{...props}
	/>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={clsx('fixed inset-0 z-50 bg-zinc-700/70 ', className)}
		{...props}
	/>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DialogPortal>
		<DialogOverlay />
		<DialogPrimitive.Content
			ref={ref}
			className={clsx(
				'fixed left-[50%] top-[50%] z-50 grid rounded-2xl w-full max-w-screen-sm translate-x-[-50%] translate-y-[-50%] gap-4 bg-white border border-surface-10 shadow md:w-full',
				className,
			)}
			{...props}>
			{children}
		</DialogPrimitive.Content>
	</DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={clsx(
			'flex flex-col space-y-1.5 text-center sm:text-left',
			className,
		)}
		{...props}
	/>
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={clsx(
			'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
			className,
		)}
		{...props}
	/>
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={clsx(
			'text-lg font-semibold leading-none tracking-tight',
			className,
		)}
		{...props}
	/>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={clsx('text-muted-foreground', className)}
		{...props}
	/>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
