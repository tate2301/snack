import React from 'react';

import { motion } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../dialog';
import clsx from 'clsx';

export type ModalProps = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	description?: string;
	actionCenter?: React.ReactNode;
	noPadding?: boolean;
};

export default function Modal({
	children,
	isOpen,
	onClose,
	title,
	description,
	actionCenter,
	noPadding,
}: ModalProps) {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/10 z-40"
					aria-hidden="true"
				/>
			)}

			{isOpen && (
				<motion.div
					initial={{ opacity: 0, display: 'none' }}
					animate={{ opacity: 1, display: 'flex' }}
					exit={{ opacity: 0, display: 'none' }}
					className={clsx(
						'fixed inset-0 flex items-center justify-center overflow-y-auto',
						!noPadding && 'p-6 pb-2',
					)}>
					{/* The actual dialog panel  */}
					<DialogContent
						autoFocus={false}
						className={clsx(
							'w-auto mx-auto bg-white rounded-2xl outline-none',
							!noPadding && 'p-6 pb-2',
						)}>
						{(title || description) && (
							<DialogHeader className="w-full mb-4">
								{title && (
									<DialogTitle className={'text-xl font-semibold'}>
										{title}
									</DialogTitle>
								)}
								{description && (
									<DialogDescription className={'text-zinc-500'}>
										{description}
									</DialogDescription>
								)}
							</DialogHeader>
						)}

						{children}

						{actionCenter && (
							<div className="p-2 bg-surface-1 border-t border-surface-4 rounded-b-lg">
								{actionCenter}
							</div>
						)}
					</DialogContent>
				</motion.div>
			)}
		</Dialog>
	);
}
