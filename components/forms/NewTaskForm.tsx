import { PlayIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import useToggle from '../../lib/hooks/useToggle';
import TaskItem from '../TaskItem';

export default function NewTaskForm() {
	const [isExpanded, toggle] = useToggle(false);
	return (
		<motion.div>
			{
				!isExpanded && <motion.div initial={{ opacity: 0 }}
																	 animate={{ opacity: 1 }}
																	 exit={{ opacity: 0 }}>
					<button
						onClick={toggle}
						className='flex gap-2 items-center py-2 rounded-lg'>
						<PlayIcon className='w-4 h-4' />
						<p>Start a new task</p>
					</button>
				</motion.div>
			}
			{isExpanded && <TaskItem id={0} />}
		</motion.div>
	);
}
