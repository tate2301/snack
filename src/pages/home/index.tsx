'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import { useAppSelector } from '../../redux/store';
import { SnackTaskStatus } from '../../redux/tasks/types';
import { selectTaskByStatus } from '../../redux/tasks';
import InboxIcon from '../../icons/InboxIcon';
import { format, startOfToday } from 'date-fns';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../components/nav/PageHeader';
import { BackButton } from '../task/[taskId]';
import { Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline';

// <p className="text-xl text-surface-10">
// 	It's {format(startOfToday(), 'EEE dd MMM')}. You have {inProgress.length}{' '}
// 	pending tasks
// </p>;
export default function HomePage() {
	const inProgress = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.InProgress),
	);

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<PageHeader>
				<div className="w-full flex justify-between">
					<div className="flex gap-4 items-center"></div>
					<div className="flex gap-2">
						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<PlusIcon className="w-5 h-5" />
							Add task
						</button>

						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<Cog6ToothIcon className="w-5 h-5" />
						</button>
					</div>
				</div>
			</PageHeader>
			<PageLayout
				name="Good morning, Tatenda"
				description={`It's ${format(startOfToday(), 'EEE dd MMM')}. You have ${
					inProgress.length
				} pending tasks`}
				icon={<InboxIcon className="w-5 h-5" />}>
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
								<TaskListItem
									onExpandTask={() => {}}
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
