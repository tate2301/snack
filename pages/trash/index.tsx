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
import PageLayout from '../../layouts/PageLayout';

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
			<PageLayout
				name={'Blocked tasks'}
				description="These might have other tasks they depend on. You get back to them!"
				icon={<XCircleIcon className="w-6 h-6 text-danger-10" />}>
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
			</PageLayout>
		</CalendarLayout>
	);
}
