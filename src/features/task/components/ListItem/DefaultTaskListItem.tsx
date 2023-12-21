import clsx from 'clsx';
import {
	differenceInDays,
	format,
	isEqual,
	startOfDay,
	startOfToday,
} from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import PostItNoteIcon from '../../../../assets/icons/PostItNoteIcon';
import { SnackTaskStatus } from '../../../../redux/tasks/types';
import { cn } from '../../../../lib/utils';
import SFSymbol from '../../../../assets/icons/SFSymbol';
import { iconColors } from '../../../../styles/constants';

type DefaultTaskListItemProps = {
	onCheck: (e) => void;
	isChecked: boolean;
	emoji?: string;
	title: string;
	complete?: boolean;
	list: {
		name: string;
		color: string;
		progress: number;
	};
	deadline: Date;
	status: SnackTaskStatus;
	subtasks: {
		complete: boolean;
	}[];
	description?: string;
	id: string;
	createdAt?: Date;
};

const Reminder = () => (
	<button>
		<SFSymbol
			name={'bell'}
			color={iconColors.labelTertiary}
		/>
	</button>
);

const Billable = () => (
	<button>
		<SFSymbol
			name={'dollarsign.circle'}
			color={iconColors.labelTertiary}
		/>
	</button>
);

const When = ({ deadline }) => (
	<button
		style={{ color: iconColors.primary }}
		className={cn('rounded-lg px-2 py-1')}>
		<SFSymbol
			name={'calendar'}
			color={deadline ? iconColors.primary : iconColors.labelTertiary}
		/>
		{deadline && format(deadline, 'MMM dd')}
	</button>
);

const items = [Reminder, When, Billable];

export default function DefaultTaskListItem(props: DefaultTaskListItemProps) {
	return (
		<motion.div
			initial={{ opacity: 0.5, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.05,
				type: 'tween',
			}}
			className="flex items-center flex-1 h-full px-2 py-1 rounded-xl group">
			<div className="flex-1 h-full">
				<AnimatePresence>
					<div className="flex items-center w-full gap-2">
						<input
							className="flex-shrink-0 rounded-xl relative z-1"
							type="checkbox"
							onChange={props.onCheck}
							checked={props.status === SnackTaskStatus.Complete}
						/>

						<div className="flex items-center pr-2 flex-1">
							<p className="flex-shrink-0">
								{props.deadline &&
									props.status !== SnackTaskStatus.Complete && (
										<>
											<span
												className={clsx(
													'py-0.5 rounded px-1 text-sm mr-1',
													differenceInDays(props.deadline, new Date()) <= 0
														? 'text-danger-11 bg-danger-4'
														: 'text-surface-11 bg-surface-4',
												)}>
												{format(props.deadline, 'MMM d')}
											</span>
										</>
									)}
							</p>

							<div className={'max-w-full pr-2'}>
								<p
									className={cn(
										'line-clamp-1 overflow-hidden text-ellipsis max-w-full group-hover:text-surface-12 transition-all',
										props.isChecked
											? 'line-through text-surface-8'
											: 'text-surface-10',
										isEqual(
											startOfToday(),
											startOfDay(props.deadline || props.createdAt),
										) && 'text-surface-12',
									)}>
									{props.title}
								</p>
							</div>
							<div className="flex items-center flex-shrink-0 gap-1">
								<AnimatePresence>
									{props.description && (
										<PostItNoteIcon className="w-4 h-4 text-surface-8" />
									)}
									{props.list.name !== 'Personal' && (
										<p className="flex items-center gap-4 mx-1">
											<span
												style={{
													borderColor: `var(--${props.list.color}-10)`,
												}}
												className="w-3 h-3 border-2 shadow-inner rounded"
											/>
										</p>
									)}
								</AnimatePresence>
							</div>
						</div>

						<div className="flex gap-2">
							<button>
								<SFSymbol
									name={'pin'}
									color={iconColors.labelTertiary}
								/>
							</button>
						</div>
					</div>
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
