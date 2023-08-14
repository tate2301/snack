'use client';
import CalendarLayout from '../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../components/Home/TaskListItem';
import CreateTask from '../components/create/CreateTask';
import NavLink from '../components/nav/NavLink';
import { useAppSelector } from '../redux/store';
import { SnackTaskStatus } from '../redux/tasks/types';
import { selectAllTasks, selectTaskByStatus } from '../redux/tasks';
import InboxIcon from '../icons/InboxIcon';
import { useRouter } from 'next/router';

export default function Page() {
	const router = useRouter();
	const { active } = router.query as {
		active: 'all' | 'complete' | 'in-progress';
	};
	const tasks = useAppSelector(selectAllTasks);
	const completeTasks = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.Complete),
	);
	const inProgress = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.InProgress),
	);

	const tabs = {
		all: tasks,
		complete: completeTasks,
		'in-progress': inProgress,
	};

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<main className={'h-full'}>
				<div className="mb-4">
					<div className="flex gap-4 items-center mb-1">
						<InboxIcon className="w-8 h-8" />
						<h1 className="text-3xl font-semibold text-surface-12">Inbox</h1>
					</div>
					<p className="text-xl">
						You have {tasks.length} tasks, {completeTasks.length} complete and{' '}
						{inProgress.length} pending
					</p>
				</div>
				<Nav />
				<CreateTask />
				<motion.div className="flex flex-col gap-2 mt-4">
					<AnimatePresence initial={false}>
						{(tabs[active] ?? tasks).map((task) => (
							<motion.div
								key={task.id}
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
								}}>
								<TaskListItem {...task} />
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</main>
		</CalendarLayout>
	);
}

const Nav = () => {
	return (
		<motion.div className="flex gap-2 mb-4">
			<NavLink
				href={{
					query: {
						active: 'all',
					},
				}}>
				Inbox
			</NavLink>
			<NavLink
				href={{
					query: {
						active: 'in-progress',
					},
				}}>
				Pending
			</NavLink>
			<NavLink
				href={{
					query: {
						active: 'complete',
					},
				}}>
				Complete
			</NavLink>
		</motion.div>
	);
};
