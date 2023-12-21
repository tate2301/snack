import { ReactNode, useEffect, useState } from 'react';
import { SnackTask, SnackTaskStatus } from '../../redux/tasks/types';
import PageHeader from '../navigation/Header';
import CalendarLayout from '../../layouts/CalendarLayout';
import {
	differenceInDays,
	format,
	isEqual,
	startOfDay,
	startOfToday,
} from 'date-fns';
import { cn } from '../../lib/utils';
import TaskListItem from '../../features/task/components/TaskListItem';
import TaskPageEmptyState from '../../features/task/components/EmptyState';
import SFSymbol from '../../assets/icons/SFSymbol';
import { iconColors } from '../../styles/constants';
import { AnimatePresence } from 'framer-motion';
import { useTaskPageLayoutNavigation } from './hooks';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addTask, deleteTask, selectAllTasks } from '../../redux/tasks';
import { generateUUID } from '../../lib/functions';

type TaskListPage = {
	grouping: string;
	groups: string[];
	tasks: {
		[key: string]: SnackTask[];
	};
	HeaderActions: ReactNode;
	title?: string;
	documentTitle: string;
	showUpComing?: boolean;
	isEmpty?: boolean;
	excludeToday?: boolean;
	setGrouping: (grouping: string) => void;
};

export default function TaskListPage(props: TaskListPage) {
	const [selectedTask, setSelectedTask] = useState<string>();
	const allTasks = useAppSelector(selectAllTasks);
	const dispatch = useAppDispatch();

	useTaskPageLayoutNavigation(props.tasks, selectedTask, setSelectedTask);

	const onNavigate = (id: string) => {
		if (selectedTask === id) setSelectedTask(null);
		setSelectedTask(id);
	};

	const onSelectTask = (id: string) => {
		setSelectedTask(id);
	};

	const onDuplicateTask = () => {
		const id = generateUUID();
		dispatch(
			addTask({
				...allTasks.find((task) => task.id === selectedTask),
				id,
				createdAt: new Date(),
				complete: false,
				status: SnackTaskStatus.Todo,
			}),
		);
		setSelectedTask(id);
	};

	const onArchiveTask = () => {
		dispatch(deleteTask(selectedTask));
		setSelectedTask(null);
	};

	useEffect(() => {
		document.title = `${props.documentTitle} - Snack`;
	}, []);

	useEffect(() => {
		props.setGrouping(props.grouping);
	}, [props.grouping]);

	return (
		<CalendarLayout hasCalendar>
			<PageHeader
				options={{
					back: false,
					create: true,
					more: true,
				}}
				title={props.title}
				actions={
					<div className="flex space-x-8 items-center">
						<div
							className={
								'p-1 rounded-lg flex items-center space-x-2 group transition-all'
							}>
							<button
								onClick={onDuplicateTask}
								className={cn(
									'rounded-lg text-surface-11 p-2',
									selectedTask && 'hover:bg-surface-4',
								)}>
								<SFSymbol
									name={'square.on.square'}
									color={selectedTask ? 'black' : iconColors.labelTertiary}
									className="w-6 h-6"
								/>
							</button>

							<button
								onClick={onArchiveTask}
								className={cn(
									'rounded-lg text-surface-11 p-2 ',
									selectedTask && 'hover:bg-surface-4',
								)}>
								<SFSymbol
									name={'archivebox'}
									color={selectedTask ? 'black' : iconColors.labelTertiary}
									className="w-6 h-6"
								/>{' '}
							</button>
						</div>
						{props.HeaderActions}
					</div>
				}
			/>
			<div className=" flex-1 h-full items-start overflow-y-auto mt-2">
				{!props.isEmpty && (
					<div className="flex flex-1 flex-col pb-2 space-y-12">
						{props.grouping !== 'all' &&
							Object.keys(props.tasks)
								.filter((key) => {
									if (
										(props.grouping === 'status' ||
											props.grouping === 'project') &&
										!props.showUpComing
									)
										return true;

									if (
										props.excludeToday &&
										props.grouping === 'day' &&
										isEqual(startOfDay(new Date(key)), startOfToday())
									)
										return false;

									if (!props.showUpComing)
										return (
											differenceInDays(
												startOfDay(new Date(key)),
												startOfToday(),
											) < 0 ||
											differenceInDays(
												startOfDay(new Date(key)),
												startOfToday(),
											) === 0
										);

									return true;
								})
								.map((key) => (
									<div className={cn('p-4')}>
										{props.grouping !== 'all' && (
											<p className="font-bold text-surface-11 border-b pb-2 px-3 mb-2 headline">
												{props.grouping === 'day' && (
													<>
														<span className="title-2 text-surface-12 mr-2">
															{format(new Date(key), 'dd')}
														</span>{' '}
														{format(new Date(key), 'EEEE, MMMM yyyy')}
													</>
												)}
												{props.grouping === 'week' &&
													`${format(
														new Date(key.split('-W')[0]),
														'MMMM yyyy',
													)}, Week ${key.split('-W')[1]}`}
												{props.grouping === 'month' && (
													<>
														<span className="title-2 text-surface-12 mr-2">
															{format(new Date(key), 'MMMM')}
														</span>{' '}
														{format(new Date(key), 'yyyy')}
													</>
												)}
												{props.grouping === 'status' && (
													<>
														<span className="title-2 text-surface-12 mr-2">
															{key}
														</span>
														<span className="ml-2 rounded-md bg-surface-2 text-surface-11 text-sm py-1 px-2">
															{props.tasks[key].length}
														</span>
													</>
												)}
												{props.grouping === 'day' &&
													isEqual(
														startOfDay(new Date(key)),
														startOfDay(new Date()),
													) && (
														<span className="py-1 px-1.5 rounded-lg bg-accent-10 text-white text-sm font-medium ml-2">
															Today
														</span>
													)}

												{props.grouping === 'project' && (
													<>
														<span className="title-2 text-surface-12 mr-2">
															{key}
														</span>
														<span className="ml-2 rounded-lg text-sm bg-surface-4 py-0.5 px-1.5">
															{props.tasks[key]?.length}
														</span>
													</>
												)}
											</p>
										)}

										<AnimatePresence>
											{props.tasks[key]?.length > 0 &&
												props.tasks[key]
													.sort((a, b) => {
														// sort with deadline or createdAt, both are dates, show the !complete ones first
														if (a.complete === b.complete) {
															if (a.deadline && b.deadline) {
																return (
																	-new Date(a.deadline).getTime() -
																	new Date(b.deadline).getTime()
																);
															} else {
																return (
																	-new Date(a.createdAt).getTime() -
																	new Date(b.createdAt).getTime()
																);
															}
														} else {
															return a.complete ? 1 : -1;
														}
													})
													.map((task) => (
														<div key={task.id}>
															<TaskListItem
																onExpandTask={() => onNavigate(task.id)}
																onCollapseTask={() => setSelectedTask(null)}
																isSelected={task.id === selectedTask}
																selectedTask={selectedTask}
																onSelectTask={(isFocused: boolean) =>
																	onSelectTask(isFocused && task.id)
																}
																{...task}
															/>
														</div>
													))}
										</AnimatePresence>
									</div>
								))}

						{props.grouping === 'all' && (
							<div className="p-4">
								{props.grouping === 'all' && (
									<p className="title-2 text-surface-12 border-b border-surface-4 pb-2 mb-2 px-3">
										All tasks
									</p>
								)}
								<AnimatePresence>
									{props.tasks['all'].map((task) => (
										<div key={task.id}>
											<TaskListItem
												onExpandTask={() => onNavigate(task.id)}
												onCollapseTask={() => setSelectedTask(null)}
												isSelected={task.id === selectedTask}
												onSelectTask={(isFocused: boolean) =>
													onSelectTask(isFocused && task.id)
												}
												selectedTask={selectedTask}
												{...task}
											/>
										</div>
									))}
								</AnimatePresence>
							</div>
						)}
						<div className="p-4 flex justify-center border-t border-surface-2 items-center space-x-4">
							<SFSymbol
								name="checklist.checked"
								color={iconColors.labelTertiary}
							/>
							<p className="text-surface-8">
								You have reached the end of the line.
							</p>
						</div>
					</div>
				)}

				{props.isEmpty && <TaskPageEmptyState />}
			</div>
		</CalendarLayout>
	);
}
