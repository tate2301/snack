'use client';
import CalendarLayout from '../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../components/Home/TaskListItem';
import CreateTask from '../components/create/CreateTask';
import { useAppSelector } from '../redux/store';
import { SnackTaskStatus } from '../redux/tasks/types';
import { selectTaskByStatus } from '../redux/tasks';

export default function Page() {
	const inProgress = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.InProgress),
	);

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<main className={'h-full'}>
				<div className="mb-4">
					<div className="flex gap-4 items-center mb-1">
						<h1 className="text-3xl font-semibold text-surface-12">
							Good evening, Tatenda
						</h1>
					</div>
					<p className="text-xl">You have {inProgress.length} tasks</p>
				</div>
				<CreateTask />
				<motion.div className="flex flex-col gap-2 mt-4">
					<AnimatePresence initial={false}>
						{inProgress.map((task) => (
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
