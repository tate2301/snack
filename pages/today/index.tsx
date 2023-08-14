'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import CreateTask from '../../components/create/CreateTask';
import NavLink from '../../components/nav/NavLink';
import { useAppSelector } from '../../redux/store';
import { SnackTaskStatus } from '../../redux/tasks/types';
import { selectAllTasks, selectTaskByStatus } from '../../redux/tasks';
import { useRouter } from 'next/router';
import TimerIcon from '../../icons/Timer';
import FocusPeriod from '../../components/focus/Focus';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

export default function Page() {
	const router = useRouter();
	const { active } = router.query as {
		active: 'all' | 'complete' | 'in-progress';
	};
	const tasks = useAppSelector(selectAllTasks);
	const completeTasks = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.InProgress),
	);

	const tabs = {
		all: tasks,
		complete: completeTasks,
	};

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<main className={'h-full flex gap-4 items-start'}>
				<div className="flex-1">
					<div className="gap-4 items-center mb-4">
						<div className="flex items-center gap-4 mb-2 w-full group pb-4">
							<h1 className="text-3xl font-semibold text-surface-12">Today</h1>
							<button className="p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-surface-1">
								<EllipsisVerticalIcon className="w-6 h-6" />
							</button>
						</div>
					</div>
					<div className="mb-12">
						<FocusPeriod />
					</div>
					<CreateTask />
					<motion.div className="flex flex-col gap-2 mt-4">
						<AnimatePresence initial={false}>
							{tasks.map((task) => (
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
							))}
						</AnimatePresence>
					</motion.div>
				</div>
			</main>
		</CalendarLayout>
	);
}
