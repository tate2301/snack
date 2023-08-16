'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import CreateTask from '../../components/create/CreateTask';
import { useAppSelector } from '../../redux/store';
import { useRouter } from 'next/router';
import TimerIcon from '../../icons/Timer';
import { CheckIcon, PlayIcon } from '@heroicons/react/20/solid';
import {
	selectAllLists,
	selectListById,
	selectOverdueTasksByListID,
	selectTasksByListId,
} from '../../redux/lists';
import SelectList from '../../components/create/SelectList';
import { ReactNode, useEffect, useState } from 'react';
import {
	ArrowPathIcon,
	ArrowRightIcon,
	CheckCircleIcon,
	RectangleStackIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import TargetIcon from '../../icons/TargetIcon';
import {
	CalendarDaysIcon,
	CalendarIcon,
	EllipsisVerticalIcon,
	PauseIcon,
	PencilIcon,
	StopIcon,
} from '@heroicons/react/24/solid';
import ProgressBar from '../../components/ui/progress';
import { SnackTask } from '../../redux/tasks/types';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import InProgressIcon from '../../icons/InProgressIcon';
import { selectOverdueTasksByID } from '../../redux/tasks';

const t = (n: number) => n * 1000;

export default function Page() {
	const [selectedList, setSelectedList] = useState('default');
	const listObject = useAppSelector(selectListById(selectedList));
	const allTasks = useAppSelector(selectTasksByListId(selectedList));
	const onTrackTasks = allTasks.filter(
		(task) =>
			!task.complete &&
			(!task.deadline || task.deadline.getTime() > Date.now()),
	);
	const overdueTasks = allTasks.filter(
		(task) =>
			!task.complete && task.deadline && task.deadline.getTime() < Date.now(),
	);

	const onChange = (val: string) => {
		setSelectedList(val);
	};

	return (
		<CalendarLayout>
			<main className={'h-full flex gap-4 items-start'}>
				<div className="flex-1">
					<div className="gap-4 w-full mb-12">
						<div className="flex justify-between items-start gap-2 mb-2 w-full">
							<h1 className="w-fit border border-surface-6 rounded-xl font-semibold mb-2 relative group flex items-baseline gap-8">
								<SelectList
									defaultListId="default"
									onChange={onChange}
								/>
							</h1>

							<div className="flex items-center justify-between gap-4">
								<FocusTimerButton />
								<button className="p-2 rounded-xl hover:bg-surface-1 hover:shadow">
									<EllipsisVerticalIcon className={'w-6 h-6'} />
								</button>
							</div>
						</div>
						<div className="flex gap-6 items-center">
							<p className="flex items-center font-semibold">
								<CheckCircleIcon className="w-5 h-5 text-success-10" />
								<span className="ml-2">8 complete</span>
							</p>
							<p className="flex items-center font-semibold">
								<InProgressIcon className="w-5 h-5 text-primary-10" />
								<span className="ml-2">22 in progress</span>
							</p>
							<p className="flex items-center font-semibold">
								<XCircleIcon className="w-5 h-5 text-danger-10" />
								<span className="ml-2">3 overdue</span>
							</p>
						</div>
					</div>

					<motion.div className="flex flex-col gap-12 mt-8">
						<AnimatePresence
							key={listObject.id}
							initial={false}>
							<div>
								<CreateTask />
							</div>
							<TasksList
								title="In Progress"
								icon={<InProgressIcon className="w-5 h-5 text-primary-10" />}
								tasks={onTrackTasks}
							/>
							<TasksList
								title="Overdue"
								icon={<XCircleIcon className="w-5 h-5 text-danger-10" />}
								tasks={overdueTasks}
							/>
						</AnimatePresence>
					</motion.div>
				</div>
			</main>
		</CalendarLayout>
	);
}

const TasksList = (props: {
	title: string;
	icon: ReactNode;
	tasks: SnackTask[];
}) => {
	return (
		<div>
			<div className="mb-2">
				<h1 className="text-xl text-surface-12 font-semibold flex items-center gap-4">
					{props.icon}
					{props.title}
				</h1>
			</div>
			<div className="flex flex-col gap-2">
				{props.tasks.length > 0 ? (
					props.tasks.map((task) => (
						<motion.div
							initial={{
								opacity: 0,
								height: 0,
							}}
							animate={{
								opacity: 1,
								height: 'auto',
								transition: {
									type: 'spring',
									bounce: 0.3,
									opactiy: {
										delay: t(0.02),
									},
								},
							}}
							exit={{
								opacity: 0,
								height: 0,
							}}
							transition={{
								type: 'spring',
								bounce: 0,
								duration: t(0.15),
								opactiy: {
									duration: t(0.03),
								},
							}}>
							<TaskListItem
								key={task.id}
								{...task}
							/>
						</motion.div>
					))
				) : (
					<p className="px-10 text-surface-10">Oops. No tasks here.</p>
				)}
			</div>
		</div>
	);
};

function FocusTimerButton({}) {
	const [isRunning, toggle] = useToggle(false);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isRunning) {
			timer = setInterval(() => {
				setSeconds((prev) => prev + 1);
			}, 1000);
		}
		return () => {
			clearInterval(timer);
		};
	}, [isRunning]);

	return (
		<div
			className={clsx(
				'p-1 px-4 rounded-xl text-xl hover:shadow items-center',
				'gap-4 font-medium flex transition-all',
				isRunning
					? 'bg-zinc-900 text-white shadow'
					: 'bg-surface-1 text-surface-12 hover:bg-surface-1',
			)}>
			{
				// Convert seconds to HH:MM:SS
				new Date(seconds * 1000).toISOString().substr(11, 8)
			}
			<p className="flex gap-2">
				{seconds > 0 && !isRunning && (
					<button
						onClick={() => setSeconds(0)}
						className="p-2 rounded-xl hover:bg-surface-3">
						<StopIcon className="w-5 h-5 text-danger-10" />
					</button>
				)}
				<button
					onClick={toggle}
					className={clsx(
						'p-2 rounded-xl transition-all',
						isRunning ? 'hover:bg-danger-12' : 'hover:bg-danger-3',
					)}>
					{!isRunning ? (
						<PlayIcon className={'w-5 h-5'} />
					) : (
						<PauseIcon className="w-5 h-5 text-danger-9" />
					)}
				</button>
			</p>
		</div>
	);
}
