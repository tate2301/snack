import clsx from 'clsx';
import useToggle from '../../lib/hooks/useToggle';
import { motion } from 'framer-motion';

const taskTextVariants = {
	checked: {
		textDecoration: 'line-through',
	},
	unchecked: {},
};

export default function Subtask({}) {
	const [checked, check] = useToggle(false);

	return (
		<div className="flex items-center gap-4 px-2 py-2 group">
			<input
				type="checkbox"
				checked={checked}
				onChange={check}
				className="w-2 h-2 rounded-full @lg:w-4 @lg:h-4"
			/>
			<motion.p
				variants={taskTextVariants}
				animate={checked ? 'checked' : 'unchecked'}
				className={clsx(
					'line-clamp-1 dark:border-zinc-800 w-full flex justify-between',
					checked
						? 'text-zinc-300 dark:text-zinc-500'
						: 'dark:text-zinc-400 text-zinc-600 ',
				)}>
				<span>Update nameservers for domain</span>
				<span className="uppercase text-zinc-500 hidden @lg:block">
					{' '}
					00:00:00
				</span>
			</motion.p>
		</div>
	);
}
