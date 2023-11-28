import CalendarLayout from '../../../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/TaskListItem';
import { useAppSelector } from '../../../../redux/store';
import { selectTasksOfToday } from '../../../../redux/tasks';
import { CheckCircleIcon, QueueListIcon } from '@heroicons/react/24/outline';
import PageLayout from '../../../../layouts/PageLayout';
import PageHeader from '../../../../components/navigation/Header';
import { format, startOfToday } from 'date-fns';
import TargetIcon from '../../../../assets/icons/TargetIcon';
import { cn } from '../../../../lib/utils';
import { useMemo, useState } from 'react';
import { groupTasksByStatus } from '../../../../lib/core/tasks';
import StartTimerButton from '../../../time-tracking/components/StartTimerButton';
import ClockInButton from '../../../time-tracking/components/StartTimerButton/ClockInButton';

export default function TodayPage() {
	const [groupBy, setGroupBy] = useState<'all' | 'status'>('status');
	const todayTasks = useAppSelector((state) =>
		selectTasksOfToday(state, new Date()),
	);

	const t = (n: number) => n * 1000;

	const groupedTasks = useMemo(
		() =>
			groupBy !== 'status'
				? { all: todayTasks }
				: groupTasksByStatus(todayTasks.reverse()),
		[todayTasks],
	);

	return (
		<CalendarLayout hasCalendar>
			<PageHeader
				title={format(startOfToday(), 'EEEE, dd MMMM yyyy')}
				actions={
					<div className="flex items-center space-x-4">
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
					</div>
				}
			/>
			<PageLayout
				name={'Complete'}
				description={`You rock! You have completed ${todayTasks.length} tasks :)`}
				icon={<CheckCircleIcon className="w-6 h-6 text-success-10" />}>
				<div className="py-4 px-3 space-y-1 sticky top-0 w-full bg-white z-30 border-b border-zinc-400/10">
					<div className="flex space-x-2 items-center">
						<h1 className="font-bold text-3xl text-surface-12">Today</h1>
					</div>
					<p>
						It's {format(startOfToday(), 'EEE, dd MMM')}. You have{' '}
						{todayTasks.length} task
						{(todayTasks.length === 0 || todayTasks.length > 1) && 's'}.
					</p>
				</div>
				<motion.div className="flex flex-col">
					<AnimatePresence initial={false}>
						{Object.keys(groupedTasks).map((key) => (
							<div
								className="py-4 px-2"
								key={key}>
								{groupBy !== 'all' && (
									<div className="py-2">
										<p className="font-medium text-surface-10 text-sm">{key}</p>
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
