import CalendarLayout from '../../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../../components/Task/TaskListItem';
import { useAppSelector } from '../../../redux/store';
import { SnackTaskStatus } from '../../../redux/tasks/types';
import {
	Cog6ToothIcon,
	PlusIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import PageLayout from '../../../layouts/PageLayout';
import PageHeader from '../../../components/navigation/Header';

export default function TrashPage() {
	const tasks = useAppSelector((state) =>
		state.tasks.items.filter((task) => task.status === SnackTaskStatus.Blocked),
	);

	const t = (n: number) => n * 1000;

	return (
		<CalendarLayout>
			<PageHeader
				title="Blocked"
				actions={
					<>
						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<Cog6ToothIcon className="w-5 h-5" />
						</button>
					</>
				}
			/>
			<PageLayout
				name={'Blocked tasks'}
				description="These might have other tasks they depend on. You get back to them!"
				icon={<XCircleIcon className="w-6 h-6 text-danger-10" />}>
				<motion.div className="flex flex-col divide-y border-b">
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
