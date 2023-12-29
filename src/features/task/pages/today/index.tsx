import { useAppSelector } from '../../../../redux/store';
import { selectTasksOfToday } from '../../../../redux/tasks';
import { cn } from '../../../../lib/utils';
import { useMemo, useState } from 'react';
import { groupTasksByStatus } from '../../../../lib/core/tasks';
import SFSymbol from '../../../../assets/icons/SFSymbol';
import TaskListPage from '../../../../components/page/TaskPageLayout';

const groups = ['status'];

export default function TodayPage() {
	const [grouping, setGrouping] = useState<string>(groups[0]);
	const todayTasks = useAppSelector((state) =>
		selectTasksOfToday(state, new Date()),
	);

	const groupedTasks = useMemo(
		() => groupTasksByStatus(todayTasks.reverse()),
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
