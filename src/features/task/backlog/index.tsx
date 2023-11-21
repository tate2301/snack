import CalendarLayout from '../../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../../components/Task/TaskListItem';
import { useAppSelector } from '../../../redux/store';
import { selectBacklogTasks } from '../../../redux/tasks';
import {
	CheckCircleIcon,
	ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import PageLayout from '../../../layouts/PageLayout';
import PageHeader from '../../../components/navigation/Header';

export default function BacklogPage() {
	const backlogTasks = useAppSelector((state) => selectBacklogTasks(state));

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<PageHeader title="" />
			<PageLayout
				name={'Complete'}
				description={`You rock! You have completed ${backlogTasks.length} tasks :)`}
				icon={<CheckCircleIcon className="w-6 h-6 text-success-10" />}>
				<div className="py-4 px-3 space-y-1">
					<div className="flex space-x-2 items-center">
						<h1 className="font-semibold text-2xl text-surface-12">Backlog</h1>
					</div>
					<p>
						You have {backlogTasks.length} task
						{(backlogTasks.length === 0 || backlogTasks.length > 1) && 's'} in
						your backlog
					</p>
				</div>
				<motion.div className="flex flex-col">
					<AnimatePresence initial={false}>
						{backlogTasks.map((task) => (
							<TaskListItem
								onExpandTask={() => {}}
								key={task.id}
								{...task}
							/>
						))}
					</AnimatePresence>
				</motion.div>
			</PageLayout>
		</CalendarLayout>
	);
}
