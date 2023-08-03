import {
	ArrowPathIcon,
	ChevronDownIcon,
	ClockIcon,
	PlayIcon,
	PlusIcon,
} from '@heroicons/react/20/solid';
import TaskItem from '../TaskItem';
import { ReactNode } from 'react';
import useToggle from '../../lib/hooks/useToggle';
import clsx from 'clsx';
import TaskListItem from './TaskListItem';
import TaskListSection from './TaskListSection';

export default function TaskList() {
	return (
		<div className="p-2">
			<TaskListSection title={'Today'} />
			<TaskListSection title={'Awaiting next action'} />
		</div>
	);
}
