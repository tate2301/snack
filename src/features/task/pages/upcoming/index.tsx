import { useAppSelector } from '../../../../redux/store';
import {
	selectBacklogTasks,
	selectUpcomingTasks,
} from '../../../../redux/tasks';
import { groupTasksByPeriod } from '../../../../lib/core/tasks';
import { useMemo, useState } from 'react';
import { cn } from '../../../../lib/utils';
import TaskListPage from '../../../../components/page/TaskPageLayout';
import SFSymbol from '../../../../assets/icons/SFSymbol';

export default function UpcomingPage() {
	const [grouping, setGrouping] = useState<string>('day');

	const upcomingTasks = useAppSelector((state) => selectUpcomingTasks(state));

	const groupedTasks = useMemo(
		() =>
			grouping === 'all'
				? { all: upcomingTasks }
				: groupTasksByPeriod(upcomingTasks, 'day'),
		[upcomingTasks],
	);

	console.log({ tasks: groupedTasks });

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
			documentTitle="Upcoming"
			excludeToday
			showUpComing
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
