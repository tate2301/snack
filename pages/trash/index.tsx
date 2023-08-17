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
import { TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Page() {
	const router = useRouter();
	const { active } = router.query as {
		active: 'all' | 'complete' | 'in-progress';
	};
	const tasks = useAppSelector((state) =>
		state.tasks.items.filter((task) => task.status === SnackTaskStatus.Blocked),
	);
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
				<XCircleIcon className="w-6 h-6 text-danger-10" />
				<div className="flex-1">
					<div className="items-center gap-4 mb-8">
						<h1 className="text-2xl font-semibold text-surface-12">Blocked</h1>
						<p>This is the place to procrastinate</p>
					</div>
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
