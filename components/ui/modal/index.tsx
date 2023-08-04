import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';

export type ModalProps = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	description?: string;
	actionCenter?: React.ReactNode;
};

export default function Modal({
	children,
	isOpen,
	onClose,
	title,
	description,
	actionCenter,
}: ModalProps) {
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className={'z-[1000] relative'}>
			<div
				className="fixed inset-0 bg-black/30"
				aria-hidden="true"
			/>

			<motion.div
				initial={{ opacity: 0, display: 'none' }}
				animate={{ opacity: 1, display: 'flex' }}
				exit={{ opacity: 0, display: 'none' }}
				className="fixed inset-0 flex items-center justify-center p-4">
				{/* The actual dialog panel  */}
				<Dialog.Panel className="min-w-[32rem] mx-auto bg-white rounded-xl overflow-hidden">
					{(title || description) && (
						<div className="w-full px-8 pt-8 mb-4">
							{title && (
								<Dialog.Title className={'text-xl font-semibold'}>
									{title}
								</Dialog.Title>
							)}
							{description && (
								<Dialog.Description className={'text-zinc-500'}>
									{description}
								</Dialog.Description>
							)}
						</div>
					)}

					<div className="px-8 pt-8 mb-4">{children}</div>
					{actionCenter && (
						<div className="p-8 bg-stone-100">{actionCenter}</div>
					)}
				</Dialog.Panel>
			</motion.div>
		</Dialog>
	);
}
