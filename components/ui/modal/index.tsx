import { motion } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../dialog';

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
			onOpenChange={onClose}>
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
				<DialogContent className="w-auto mx-auto bg-white rounded-xl">
					{(title || description) && (
						<DialogHeader className="w-full mb-4">
							{title && (
								<DialogTitle className={'text-xl font-medium'}>
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
						<DialogFooter className="p-8 bg-stone-100">
							{actionCenter}
						</DialogFooter>
					)}
				</DialogContent>
			</motion.div>
		</Dialog>
	);
}
