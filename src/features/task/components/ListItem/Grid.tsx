import clsx from 'clsx';
import PostItNoteIcon from '../../../../assets/icons/PostItNoteIcon';
import { differenceInDays, format } from 'date-fns';
import { QueueListIcon } from '@heroicons/react/24/outline';
import { Tag } from '../TaskListItem';
import { SnackTaskStatus } from '../../../../redux/tasks/types';

type GridTaskListItemProps = {
	description?: string;
	emoji?: string;
	title: string;
	status?: string;
	deadline?: Date;
	subtasks: Array<any>; // Replace `any` with the specific type for subtasks
	tags?: Array<string>;
};

export default function GridTaskListItem(props: GridTaskListItemProps) {
	return (
		<div className="h-full px-2 py-2 rounded-xl bg-surface-1 shadow">
			{props.description && (
				<PostItNoteIcon className="w-5 h-5 text-surface-8" />
			)}
			<p className="font-semibold text-surface-12 mt-1">
				{props.emoji && <span className="text-xl mr-2">{props.emoji}</span>}{' '}
				{props.title}
			</p>
			<div className="flex gap-2 items-center">
				{props.deadline && props.status !== SnackTaskStatus.Complete && (
					<p className="text-sm text-surface-10 mt-2">
						<span
							className={clsx(
								'p-0.5 rounded px-1 text-sm',
								differenceInDays(props.deadline, new Date()) <= 0
									? 'text-danger-10'
									: 'text-primary-11',
							)}>
							{format(props.deadline, 'MMM d')}
						</span>
					</p>
				)}
				{props.subtasks.length > 0 && (
					<p className="text-sm flex items-center gap-2 mt-2">
						&bull;
						<QueueListIcon className="w-4 h-4" />
						<span className="text-surface-10">
							{props.subtasks.filter((subtask) => subtask.complete).length} of{' '}
							{props.subtasks.length}
						</span>
					</p>
				)}
			</div>
			{props.tags && (
				<div className="flex gap-1 mt-2">
					{props.tags?.slice(0, 3).map((tag) => (
						<Tag
							key={tag}
							value={tag}
						/>
					))}
				</div>
			)}
		</div>
	);
}
