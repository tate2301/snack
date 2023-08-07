import {
	ArrowPathIcon,
	ChevronDownIcon,
	ClockIcon,
	PlayIcon,
	PlusIcon,
} from '@heroicons/react/20/solid';
import TaskItem from '../TaskItem';
import { ReactNode } from 'react';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import TaskListItem from './TaskListItem';
import TaskListSection from './TaskListSection';

export default function TaskList() {
	return (
		<div className="py-2 flex-1">
			<TaskListSection title={'Work'} />
			<TaskListSection title={'Personal'} />
		</div>
	);
}
