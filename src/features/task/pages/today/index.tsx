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
import TimeTracker from '../../../time-tracking';
import ClockInButton from '../../../time-tracking/components/StartTimerButton/ClockInButton';
import SFSymbol from '../../../../assets/icons/SFSymbol';

export default function TodayPage() {
	const [groupBy, setGroupBy] = useState<'all' | 'status'>('all');
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
									'rounded-lg px-2 py-1 text-surface-9',
									groupBy === 'all' && 'bg-surface-6 text-surface-12',
								)}
								onClick={() => setGroupBy('all')}>
								<SFSymbol
									name={'checklist'}
									color={'#121212'}
									className="w-6 h-6"
								/>
							</button>
							<button
								className={cn(
									'rounded-lg px-2 py-1 text-surface-9',
									groupBy === 'status' && 'bg-surface-6 text-surface-12',
								)}
								onClick={() => setGroupBy('status')}>
								<SFSymbol
									name={'target'}
									color={'#121212'}
									className="w-6 h-6"
								/>
							</button>
						</div>
					</div>
				}
			/>
			<PageLayout
				name={'Complete'}
				description={`You rock! You have completed ${todayTasks.length} tasks :)`}
				icon={<CheckCircleIcon className="w-6 h-6 text-success-10" />}>
				<motion.div className="flex flex-col px-2 h-full">
					<AnimatePresence initial={false}>
						{todayTasks.length > 0 &&
							Object.keys(groupedTasks).map((key) => (
								<div
									className="py-4 px-2 h-full"
									key={key}>
									{groupBy !== 'all' && (
										<div className="py-2">
											<p className="bold text-surface-12 text-xl font-bold">
												{key}
											</p>
										</div>
									)}
									{todayTasks.length > 0 &&
										groupedTasks[key].map((task) => (
											<TaskListItem
												onExpandTask={() => {}}
												key={task.id}
												{...task}
											/>
										))}
								</div>
							))}

						{todayTasks.length === 0 && (
							<div className="py-2 w-full h-full flex items-center justify-center">
								<div className={'text-center'}>
									<SFSymbol
										name={'lightbulb'}
										color={'#707070'}
										className={'!w-12 !h-12 mx-auto mb-5'}
									/>
									<h1 className={'title-2 text-surface-12 mb-1 mx-auto'}>
										You're a productivity superstar!
									</h1>
									<p className={'mx-auto'}>
										Congratulations on completing all your tasks for today.
									</p>
								</div>
							</div>
						)}
					</AnimatePresence>
				</motion.div>
			</PageLayout>
		</CalendarLayout>
	);
}
