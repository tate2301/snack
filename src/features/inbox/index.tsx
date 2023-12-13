'use client';
import { useAppSelector } from '../../redux/store';
import { selectAllTasks } from '../../redux/tasks';
import { useMemo, useState } from 'react';
import {
	groupTasksByPeriod,
	groupTasksByProject,
	groupTasksByStatus,
} from '../../lib/core/tasks';
import { cn } from '../../lib/utils';
import { selectAllLists } from '../../redux/lists';
import SFSymbol from '../../assets/icons/SFSymbol';
import Divider from '../../components/ui/divider/Divider';
import { Simulate } from 'react-dom/test-utils';
import select = Simulate.select;
import TaskListPage from '../../components/page/TaskPageLayout';
import { SnackTask } from '../../redux/tasks/types';

const groups = ['month', 'status', 'project'];

export default function HomePage() {
	const [grouping, setGrouping] = useState<string>(groups[0]);
	const allTasks = useAppSelector((state) => selectAllTasks(state));
	const allProjects = useAppSelector(selectAllLists);

	const groupedTasks: { [key: string]: SnackTask[] } = useMemo(() => {
		if (grouping === 'day' || grouping === 'month')
			return groupTasksByPeriod(allTasks.reverse(), grouping);
		if (grouping === 'status') return groupTasksByStatus(allTasks.reverse());
		if (grouping === 'project')
			return groupTasksByProject(allTasks.reverse(), allProjects);

		return { all: allTasks };
	}, [allTasks]);

	return (
		<TaskListPage
			tasks={groupedTasks}
			groups={groups}
			grouping={grouping}
			setGrouping={setGrouping}
			documentTitle="Inbox"
			HeaderActions={
				<div
					className={
						'p-1 rounded-lg flex items-center space-x-2 group bg-surface-2 transition-all'
					}>
					<button
						onClick={() => setGrouping('month')}
						className={cn(
							'rounded-lg text-surface-11 px-2 py-1',
							grouping === 'month' && '!bg-surface-6 !text-surface-12',
						)}>
						<SFSymbol
							name={'calendar'}
							color={'black'}
							className="w-6 h-6"
						/>
					</button>

					<button
						onClick={() => setGrouping('status')}
						className={cn(
							'rounded-lg text-surface-11 px-2 py-1',
							grouping === 'status' && '!bg-surface-6 !text-surface-12',
						)}>
						<SFSymbol
							name={'target'}
							color={'black'}
							className="w-6 h-6"
						/>{' '}
					</button>

					<button
						onClick={() => setGrouping('project')}
						className={cn(
							'rounded-lg text-surface-11 px-2 py-1',
							grouping === 'project' && '!bg-surface-6 !text-surface-12',
						)}>
						<SFSymbol
							name={'folder'}
							color={'black'}
							className="w-6 h-6"
						/>{' '}
					</button>
				</div>
			}
		/>
	);
}
