import { ReactNode, createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext({
	createToast: (text: string) => null,
});

export const useToast = () => {
	const { createToast } = useContext(ToastContext);

	return { toast: createToast };
};

export const ToastProvider = (props: { children: ReactNode }) => {
	const [toastMessage, setToastMessage] = useState('');

	const createToast = (text: string) => {
		setToastMessage(text);

		setTimeout(() => {
			setToastMessage(null);
		}, 3000);
	};
	return (
		<ToastContext.Provider value={{ createToast }}>
			<AnimatePresence>
				{toastMessage && (
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}
						style={{
							bottom: '1rem',
							zIndex: 9999,
							left: '50%',
							transform: 'translateX(-50%)',
						}}
						className="fixed">
						<p className="pl-4 pr-2 py-2 rounded-full bg-surface-12 text-surface-1 font-medium inline-flex items-center gap-4 shadow-xl border-surface-1 border">
							{toastMessage}
							<button className="p-1 bg-zinc-700 text-primary-9 rounded-full px-2">
								Undo
							</button>
						</p>
					</motion.div>
				)}
			</AnimatePresence>
			{props.children}
		</ToastContext.Provider>
	);
};
