('use client');
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../task/components/TaskListItem';
import { useAppSelector } from '../../redux/store';
import { SnackTaskStatus } from '../../redux/tasks/types';
import { selectTaskByStatus } from '../../redux/tasks';
import InProgressIcon from '../../assets/icons/InProgressIcon';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../components/navigation/Header';
import { Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function InProgressPage() {
	const inProgress = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.InProgress),
	);

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<PageHeader
				title="In Progress"
				actions={
					<>
						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<Cog6ToothIcon className="w-5 h-5" />
						</button>
					</>
				}
			/>
			<PageLayout
				name={'In Progress'}
				description="Let's get these done with. Keep it up!"
				icon={<InProgressIcon className="w-6 h-6 text-primary-10" />}>
				<motion.div className="flex flex-col gap-2 mt-4">
					<AnimatePresence initial={false}>
						{inProgress.map((task) => (
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
									onExpandTask={() => {}}
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
