'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import CreateTask from '../../components/create/CreateTask';
import { useAppSelector } from '../../redux/store';
import { SnackTaskStatus } from '../../redux/tasks/types';
import { selectTaskByStatus } from '../../redux/tasks';
import { useRouter } from 'next/router';
import InProgressIcon from '../../icons/InProgressIcon';
import PageLayout from '../../layouts/PageLayout';

export default function Page() {
	const router = useRouter();
	const { active } = router.query as {
		active: 'all' | 'complete' | 'in-progress';
	};
	const inProgress = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.InProgress),
	);

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
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
