import CalendarLayout from '../../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../../components/Task/TaskListItem';
import { useAppSelector } from '../../../redux/store';
import { selectTasksOfToday } from '../../../redux/tasks';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import PageLayout from '../../../layouts/PageLayout';
import PageHeader from '../../../components/navigation/Header';
import { format, startOfToday } from 'date-fns';

export default function TodayPage() {
	const todayTasks = useAppSelector((state) =>
		selectTasksOfToday(state, new Date()),
	);

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<PageHeader title="" />
			<PageLayout
				name={'Complete'}
				description={`You rock! You have completed ${todayTasks.length} tasks :)`}
				icon={<CheckCircleIcon className="w-6 h-6 text-success-10" />}>
				<div className="py-4 px-3 space-y-1">
					<div className="flex space-x-2 items-center">
						<h1 className="font-semibold text-2xl text-surface-12">Today</h1>
					</div>
					<p>
						It's {format(startOfToday(), 'EEE, dd MMM')}. You have{' '}
						{todayTasks.length} task
						{(todayTasks.length === 0 || todayTasks.length > 1) && 's'}.
					</p>
				</div>
				<motion.div className="flex flex-col">
					<AnimatePresence initial={false}>
						{todayTasks.map((task) => (
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
