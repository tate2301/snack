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
import {
	groupTasksByPeriod,
	groupTasksByStatus,
} from '../../../../lib/core/tasks';
import { groupBy } from 'lodash';
import { useMemo, useState } from 'react';
import { cn } from '../../../../lib/utils';
import TargetIcon from '../../../../assets/icons/TargetIcon';
import TaskListPage from '../../../../components/page/TaskPageLayout';
import SFSymbol from '../../../../assets/icons/SFSymbol';

export default function SilencedPage() {
	const [grouping, setGrouping] = useState<string>('day');

	const backlogTasks = useAppSelector((state) => selectBacklogTasks(state));

	const groupedTasks = useMemo(
		() =>
			grouping === 'all'
				? { all: backlogTasks }
				: groupTasksByPeriod(backlogTasks.reverse(), 'day'),
		[backlogTasks],
	);

	return (
		<TaskListPage
			tasks={
				grouping === 'day'
					? {
							...groupedTasks,
					  }
					: groupedTasks
			}
			groups={['day', 'all']}
			grouping={grouping}
			setGrouping={setGrouping}
			documentTitle="Silenced"
			excludeToday
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
								name={'checklist.unchecked'}
								color={'#121212'}
								className="w-6 h-6"
							/>
						</button>
						<button
							className={cn(
								'rounded-lg px-2 py-1 text-surface-9',
								grouping === 'day' && 'bg-surface-6 text-surface-12',
							)}
							onClick={() => setGrouping('day')}>
							<SFSymbol
								name={'calendar'}
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
