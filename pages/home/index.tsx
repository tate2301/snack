'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import CreateTask from '../../components/create/CreateTask';
import { useAppSelector } from '../../redux/store';
import { SnackTaskStatus } from '../../redux/tasks/types';
import { selectTaskByStatus } from '../../redux/tasks';
import InboxIcon from '../../icons/InboxIcon';
import {
	EllipsisVerticalIcon,
	Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

export default function Page() {
	const inProgress = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.InProgress),
	);

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<main className={'h-full'}>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-4 mb-1">
						<InboxIcon className="w-6 h-6 text-surface-10" />

						<h1 className="text-2xl font-semibold text-surface-12">
							Good evening, Tatenda
						</h1>
					</div>
					<div className="flex gap-2">
						<button className="p-2 hover:bg-surface-1 rounded-xl">
							<Square3Stack3DIcon className="w-5 h-5" />
						</button>
						<button className="p-2 rounded-xl hover:bg-surface-1">
							<EllipsisVerticalIcon className="w-5 h-5" />
						</button>
					</div>
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
