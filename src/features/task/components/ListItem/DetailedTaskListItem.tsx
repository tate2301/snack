import clsx from 'clsx';
import { differenceInDays, format } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { TaskStatus } from '../TaskListItem';
import { SnackTask, SnackTaskStatus } from '../../../../redux/tasks/types';
import { motion } from 'framer-motion';
import SFSymbol from '../../../../assets/icons/SFSymbol';
import { iconColors } from '../../../../styles/constants';
import Textarea from '../../../../components/ui/input/textarea';
import { TaskChecklist } from '../TaskExpandedView';
import ProjectList from '../../../../components/forms/select/ProjectsList';

type DetailedTaskListItemProps = {
	onCheck: (e) => void;
	isChecked: boolean;
	emoji?: string;
	title: string;
	complete?: boolean;
	list: {
		name: string;
		color: string;
		id: string;
	};
	deadline?: Date;
	status: SnackTaskStatus;
	subtasks: {
		complete: boolean;
	}[];
	description?: string;
	id: string;
};

export default function DetailedTaskListItem(
	props: DetailedTaskListItemProps & SnackTask,
) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: '-0.75rem',
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				x: 0,
				y: '-0.75rem',
			}}
			transition={{
				type: 'tween',
				ease: 'easeInOut',
				duration: 0.3,
			}}
			className="flex items-center flex-1 h-full rounded-xl bg-white my-4 px-2 py-3 border border-surface-4 shadow-sm">
			<div className="flex-1 h-full">
				<AnimatePresence>
					<div className="flex items-start w-full gap-2">
						<input
							className="flex-shrink-0 rounded-xl relative z-1 mt-2"
							type="checkbox"
							onChange={props.onCheck}
							checked={props.status === SnackTaskStatus.Complete}
						/>

						<div className="flex-1 pr-2 space-y-2">
							<div className="flex items-center">
								{props.deadline &&
									props.status !== SnackTaskStatus.Complete && (
										<>
											<p
												className={clsx(
													'py-1 rounded-lg px-2 flex-shrink-0 text-sm mr-2 flex items-center font-semibold space-x-2',
													differenceInDays(props.deadline, new Date()) <= 0
														? 'text-danger-10 bg-danger-4'
														: 'text-surface-11 bg-alternateSurface',
												)}>
												<SFSymbol
													name={'bell'}
													className={'!w-5 !h-5'}
													color={iconColors.danger}
												/>
												<span>{format(props.deadline, 'MMM d')}</span>
											</p>
										</>
									)}

								<Textarea
									className={clsx(
										'line-clamp-1 pr-4 w-full outline-none font-semibold text-surface-12',
									)}
									value={props.title}
									name={'title'}
								/>
							</div>

							<div>
								{props.description && (
									<Textarea
										value={props.description}
										name={'description'}
										className={
											'bg-transparent text-surface-12 w-full outline-none mt-2 mb-0'
										}
									/>
								)}
								<TaskChecklist {...props} />
							</div>

							<div className="flex justify-between items-center border-t pt-4 border-alternateSurface">
								<div className="text-sm text-surface-11 flex items-center gap-4">
									<span className="flex items-center gap-2 rounded-lg bg-alternateSurface px-2 py-1 font-semibold">
										<ProjectList
											defaultListId={props.list.id}
											onChange={() => null}
										/>
									</span>

									{props.subtasks?.length > 0 && (
										<>
											<span className="flex gap-2 items-center rounded-lg px-2 py-1 bg-alternateSurface font-semibold">
												{props.subtasks.filter((s) => !s.complete).length !==
													0 && (
													<SFSymbol
														name={'checklist'}
														color={'#808080'}
													/>
												)}
												{props.subtasks.filter((s) => !s.complete).length ===
													0 && (
													<SFSymbol
														name={'checklist.checked'}
														color={'#808080'}
													/>
												)}
												<span>
													{
														props.subtasks.filter((subtask) => subtask.complete)
															.length
													}{' '}
													of {props.subtasks.length}
												</span>
											</span>
										</>
									)}
									<span className="flex items-center gap-2 rounded-lg bg-alternateSurface px-3 py-2 font-semibold">
										<TaskStatus status={props.status} />
									</span>
								</div>
							</div>
						</div>
					</div>
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
