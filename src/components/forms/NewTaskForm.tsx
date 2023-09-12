import React from "react";

import { motion } from 'framer-motion';
import useToggle from '../../hooks/useToggle';
import TaskItem from '../TaskItem';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function NewTaskForm() {
	const [isExpanded, toggle] = useToggle(false);
	return (
		<motion.div className={'mb-8'}>
			{!isExpanded && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
					<button
						onClick={toggle}
						className="flex gap-2 items-center p-2 text-zinc-900 rounded-xl bg-zinc-100 w-full">
						<PlusIcon className="w-5 h-5" />
						<p>Add a new task</p>
					</button>
				</motion.div>
			)}
			{isExpanded && <TaskItem id={0} />}
		</motion.div>
	);
}
