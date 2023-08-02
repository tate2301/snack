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

export default function TaskList() {
	return (
		<div>
			<div className="p-2">
				<TaskSectionHeader title="Inbox Zero" />
				<div className="flex flex-col gap-1">
					<TaskListItem title="Design new App icon to replace eletron logo" />
				</div>
			</div>
			<div className="p-2">
				<TaskSectionHeader title="Today" />
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-4 px-4 py-1 transition-all rounded-lg hover:bg-zinc-50">
						<input
							className="mt-1 rounded-xl"
							type="checkbox"
						/>
						<p className="text-zinc-600">Build and deploy personal site</p>
					</div>
					<div className="flex items-center gap-4 px-4 py-1 transition-all rounded-lg hover:bg-zinc-50">
						<input
							className="mt-1 rounded-xl"
							type="checkbox"
						/>
						<p className="text-zinc-600">
							Contact the team about the new project
						</p>
					</div>
					<div className="flex items-center gap-4 px-4 py-1 transition-all rounded-lg hover:bg-zinc-50">
						<input
							className="mt-1 rounded-xl"
							type="checkbox"
						/>
						<p className="text-zinc-600">Ask for feedback on the new design</p>
					</div>
				</div>
			</div>
			<div className="p-2">
				<TaskSectionHeader title="Waiting for next action" />
				<div className="flex flex-col gap-1">
					<TaskListItem
						icon={<PlayIcon className="w-4 h-4" />}
						title={'Ask for feedback on the new design'}
					/>
					<TaskListItem
						icon={<PlayIcon className="w-4 h-4" />}
						title={'Ask for feedback on the new design'}
					/>
				</div>
			</div>
			<div className="p-2">
				<TaskSectionHeader title="Blocked by others" />
				<div className="flex flex-col gap-1">
					<TaskItem id={2} />
					<TaskItem id={2} />
					<TaskItem id={2} />
					<button className="flex items-center gap-4 px-4 py-1 transition-all rounded-lg hover:bg-zinc-50">
						<PlusIcon className="w-4 h-4" />
						Add a task
					</button>
				</div>
			</div>
		</div>
	);
}

function TaskListItem({ icon, title }: { icon?: ReactNode; title: string }) {
	const [isChecked, toggle] = useToggle(false);

	return (
		<div className="flex items-start justify-between py-2 pl-4 pr-2 transition-all rounded-lg hover:bg-zinc-50">
			<div className="flex items-center gap-4">
				<input
					className="mt-1 rounded-xl"
					type="checkbox"
					onChange={toggle}
					checked={isChecked}
				/>
				<p
					className={clsx(
						isChecked ? 'line-through text-zinc-400' : 'text-zinc-600',
					)}>
					{title}
				</p>
			</div>
			<button className="p-1 text-zinc-400">{icon}</button>
		</div>
	);
}

function TaskSectionTitle({}) {
	return (
		<div className="p-2">
			<div className="flex w-full justify-between items-center hover:bg-zinc-50 pr-2">
				<button className="inline-flex items-center w-full gap-4 px-4 py-2 font-mono text-sm font-semibold uppercase  text-zinc-500">
					<ChevronDownIcon className="w-4 h-4" />
					Unlabelled
				</button>
				<button className="p-1 rounded hover:bg-zinc-100">
					<PlusIcon className="w-5 h-5" />
				</button>
			</div>
			<div className="flex flex-col gap-1">
				<TaskListItem title="Design new App icon to replace eletron logo" />
			</div>
		</div>
	);
}

function TaskSectionHeader({ title }: { title: string }) {
	return (
		<div className="flex w-full justify-between items-center hover:bg-zinc-50 pr-2">
			<button className="inline-flex items-center w-full gap-4 px-4 py-2 font-mono text-sm font-semibold uppercase  text-zinc-500">
				<ChevronDownIcon className="w-4 h-4" />
				{title}
			</button>
			<button className="p-1 rounded hover:bg-zinc-100">
				<PlusIcon className="w-5 h-5" />
			</button>
		</div>
	);
}
