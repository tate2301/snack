import CalendarLayout from '../../../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/TaskListItem';
import { useAppSelector } from '../../../../redux/store';
import { selectBacklogTasks } from '../../../../redux/tasks';
import {
	CheckCircleIcon,
	ExclamationCircleIcon,
	QueueListIcon,
} from '@heroicons/react/24/outline';
import PageLayout from '../../../../layouts/PageLayout';
import PageHeader from '../../../../components/navigation/Header';
import { groupTasksByStatus } from '../../../../lib/core/tasks';
import { groupBy } from 'lodash';
import { useMemo, useState } from 'react';
import { cn } from '../../../../lib/utils';
import TargetIcon from '../../../../assets/icons/TargetIcon';

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
				title="Backlog"
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
				description={`You rock! You have completed ${backlogTasks.length} tasks :)`}
				icon={<CheckCircleIcon className="w-6 h-6 text-success-10" />}>
				<motion.div className="flex flex-col px-2">
					<AnimatePresence initial={false}>
						{Object.keys(groupedTasks)
							.filter((key) => key !== 'Complete')
							.map((key) => (
								<div
									className="py-4 px-2"
									key={key}>
									{groupBy !== 'all' && (
										<div className="py-2">
											<p className="bold text-surface-12 text-xl font-bold">
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
