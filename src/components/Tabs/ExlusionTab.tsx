import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function ExclusionTab(props: {
	children: ReactNode;
	isActive: boolean;
	id: string;
}) {
	return (
		<button
			className="relative w-full"
			style={{
				WebkitTapHighlightColor: 'transparent',
			}}>
			{props.isActive && (
				<motion.span
					layoutId={props.id}
					className="absolute top-0 left-0 z-10 w-full h-full rounded-lg bg-surface-6 mix-blend-multiply "
					transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
				/>
			)}
			{props.children}
		</button>
	);
}
