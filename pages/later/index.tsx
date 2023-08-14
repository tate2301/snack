'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import CreateTask from '../../components/create/CreateTask';
import NavLink from '../../components/nav/NavLink';
import { useAppSelector } from '../../redux/store';
import { SnackTaskStatus } from '../../redux/tasks/types';
import { selectAllTasks, selectTaskByStatus } from '../../redux/tasks';
import InboxIcon from '../../icons/InboxIcon';
import { useRouter } from 'next/router';
import CalendarIcon from '../../icons/CalendarIcon';

export default function Page() {
	const router = useRouter();
	const { active } = router.query as {
		active: 'all' | 'complete' | 'in-progress';
	};
	const tasks = useAppSelector(selectAllTasks);
	const completeTasks = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.Complete),
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
					<div className="flex gap-4 items-center mb-8">
						<h1 className="text-3xl font-semibold text-surface-12">
							Will do maybe later
						</h1>
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
