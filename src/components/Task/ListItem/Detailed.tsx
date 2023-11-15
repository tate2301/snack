import { FolderIcon, QueueListIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { differenceInDays, format } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import PostItNoteIcon from '../../../icons/PostItNoteIcon';
import { TaskStatus } from '../TaskListItem';
import { SnackTaskStatus } from '../../../redux/tasks/types';

type DetailedTaskListItemProps = {
	onCheck: (e) => void;
	isChecked: boolean;
	emoji?: string;
	title: string;
	complete?: boolean;
	list: {
		name: string;
		color: string;
	};
	deadline?: Date;
	status: SnackTaskStatus;
	subtasks: {
		complete: boolean;
	}[];
	description?: string;
	id: string;
};

export default function DetailedTaskListItem(props: DetailedTaskListItemProps) {
	return (
		<div className="flex items-center flex-1 h-full px-2 rounded">
			<div className="flex-1 h-full">
				<AnimatePresence>
					<div className="flex items-center w-full gap-2">
						<input
							className="flex-shrink-0 rounded-xl relative z-1"
							type="checkbox"
							onChange={props.onCheck}
							checked={props.isChecked}
						/>

						<div className="flex-1 pr-2">
							<div className="flex items-center">
								<p>
									{props.emoji && (
										<span className="text-xl mr-2">{props.emoji}</span>
									)}
								</p>
								<p
									className={clsx(
										'line-clamp-1 pr-2',
										props.isChecked
											? 'line-through text-zinc-400 '
											: 'text-surface-12',
									)}>
									{' '}
									{props.title}
								</p>
							</div>
							{!props.complete && (
								<p className="text-sm text-surface-10 flex items-center gap-2">
									<span className="flex items-center gap-2">
										<FolderIcon className="w-4 h-4" />
										{props.list.name}
									</span>
									{props.deadline &&
										props.status !== SnackTaskStatus.Complete && (
											<>
												&bull;
												<span
													className={clsx(
														'p-0.5 rounded px-1 text-sm',
														differenceInDays(props.deadline, new Date()) <= 0
															? 'text-danger-10'
															: 'text-primary-11',
													)}>
													{format(props.deadline, 'MMM d')}
												</span>
											</>
										)}
									{props.subtasks.length > 0 && (
										<>
											&bull;
											<span className="flex gap-2 items-center">
												<QueueListIcon className="w-4 h-4" />
												<span className="text-surface-10">
													{
														props.subtasks.filter((subtask) => subtask.complete)
															.length
													}{' '}
													of {props.subtasks.length}
												</span>
											</span>
										</>
									)}
								</p>
							)}
						</div>

						<div className="flex items-center flex-shrink-0 gap-2 ml-2">
							<AnimatePresence>
								{props.description && (
									<PostItNoteIcon className="w-5 h-5 text-surface-8" />
								)}
								<p className="flex items-center gap-4 mx-2">
									<span
										style={{
											borderColor: `var(--${props.list.color}-10)`,
										}}
										className="w-4 h-4 border-2 rounded-md"
									/>
								</p>
								<TaskStatus status={props.status} />
							</AnimatePresence>
						</div>
					</div>
				</AnimatePresence>
			</div>
		</div>
	);
}
