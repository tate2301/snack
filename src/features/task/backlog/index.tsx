import CalendarLayout from '../../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../../components/Task/TaskListItem';
import { useAppSelector } from '../../../redux/store';
import { selectBacklogTasks } from '../../../redux/tasks';
import {
	CheckCircleIcon,
	ExclamationCircleIcon,
	QueueListIcon,
} from '@heroicons/react/24/outline';
import PageLayout from '../../../layouts/PageLayout';
import PageHeader from '../../../components/navigation/Header';
import { groupTasksByStatus } from '../../../lib/core/tasks';
import { groupBy } from 'lodash';
import { useMemo, useState } from 'react';
import { cn } from '../../../lib/utils';
import TargetIcon from '../../../icons/TargetIcon';

export default function BacklogPage() {
	const [groupBy, setGroupBy] = useState<'all' | 'status'>('status');

	const backlogTasks = useAppSelector((state) => selectBacklogTasks(state));

	const groupedTasks = useMemo(
		() =>
			groupBy !== 'status'
				? { all: backlogTasks }
				: groupTasksByStatus(backlogTasks.reverse()),
		[backlogTasks],
	);

	return (
		<CalendarLayout>
			<PageHeader
				title=""
				actions={
					<div className="rounded-xl text-sm flex gap-1">
						<button
							className={cn(
								'rounded-lg px-1 py-1 text-surface-9',
								groupBy === 'all' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setGroupBy('all')}>
							<QueueListIcon className="w-6 h-6" />
						</button>
						<button
							className={cn(
								'rounded-lg px-2 py-1 text-surface-9',
								groupBy === 'status' && 'bg-surface-4 text-surface-12',
							)}
							onClick={() => setGroupBy('status')}>
							<TargetIcon className="w-5 h-5" />
						</button>
					</div>
				}
			/>
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
						{Object.keys(groupedTasks)
							.filter((key) => key !== 'Complete')
							.map((key) => (
								<div
									className="py-4 px-2"
									key={key}>
									{groupBy !== 'all' && (
										<div className="py-2">
											<p className="font-medium text-surface-10 text-sm">
												{key}
											</p>
										</div>
									)}
									{groupedTasks[key].map((task) => (
										<TaskListItem
											onExpandTask={() => {}}
											key={task.id}
											{...task}
										/>
									))}
									{groupedTasks[key].length === 0 && (
										<div className="py-2">
											<p>No tasks</p>
										</div>
									)}
								</div>
							))}
					</AnimatePresence>
				</motion.div>
			</PageLayout>
		</CalendarLayout>
	);
}
