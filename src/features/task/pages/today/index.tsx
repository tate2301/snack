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
import TimeTracker from '../../../../plugins/integrations/time-tracking';
import ClockInButton from '../../../../plugins/integrations/time-tracking/components/StartTimerButton/ClockInButton';
import SFSymbol from '../../../../assets/icons/SFSymbol';
import TaskListPage from '../../../../components/page/TaskPageLayout';

const groups = ['all', 'status'];

export default function TodayPage() {
	const [grouping, setGrouping] = useState<string>(groups[0]);
	const todayTasks = useAppSelector((state) =>
		selectTasksOfToday(state, new Date()),
	);

	const groupedTasks = useMemo(
		() =>
			grouping !== 'status'
				? { all: todayTasks }
				: groupTasksByStatus(todayTasks.reverse()),
		[todayTasks],
	);

	return (
		<TaskListPage
			tasks={groupedTasks}
			groups={groups}
			grouping={grouping}
			setGrouping={setGrouping}
			documentTitle="Today"
			HeaderActions={
				<div className="flex items-center space-x-4">
					<div className="rounded-xl text-sm flex gap-1">
						<button
							className={cn(
								'rounded-lg px-2 py-1 text-surface-9',
								grouping === 'all' && 'bg-surface-6 text-surface-12',
							)}
							onClick={() => setGrouping('all')}>
							<SFSymbol
								name={'checklist'}
								color={'#121212'}
								className="w-6 h-6"
							/>
						</button>
						<button
							className={cn(
								'rounded-lg px-2 py-1 text-surface-9',
								grouping === 'status' && 'bg-surface-6 text-surface-12',
							)}
							onClick={() => setGrouping('status')}>
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
	);
}
