'use client';
import CalendarLayout from '../../layouts/CalendarLayout';
import { AnimatePresence, motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import CreateTask from '../../components/create/CreateTask';
import { useAppSelector } from '../../redux/store';
import { useRouter } from 'next/router';
import TimerIcon from '../../icons/Timer';
import { PlayIcon } from '@heroicons/react/20/solid';
import {
	selectAllLists,
	selectListById,
	selectTasksByListId,
} from '../../redux/lists';
import SelectList from '../../components/create/SelectList';
import { useState } from 'react';

export default function Page() {
	const [selectedList, setSelectedList] = useState('default');
	const listObject = useAppSelector(selectListById(selectedList));
	const tasksForList = useAppSelector(selectTasksByListId(selectedList));
	const t = (n: number) => n * 1000;

	const onChange = (val: string) => {
		setSelectedList(val);
	};

	return (
		<CalendarLayout>
			<main className={'h-full flex gap-4 items-start'}>
				<div className="flex-1">
					<div className="gap-4 w-full mb-12">
						<div className="flex flex-col items-start gap-4 mb-8 group">
							<div>
								<h1 className="text-5xl font-semibold text-surface-12">
									00:00:00
								</h1>
								<p className="text-surface-10">
									Total time spent on tasks today: 6h 22m
								</p>
							</div>
							<div className="w-full flex items-start justify-start gap-4">
								<div>
									<SelectList
										onChange={onChange}
										defaultListId={'default'}
									/>
								</div>
								<button className="p-2 px-4 rounded-xl bg-surface-12 text-white">
									<TimerIcon className={'w-5 h-5'} />
									Start timed session
								</button>
							</div>
						</div>
					</div>

					<motion.div className="flex flex-col gap-2 mt-8">
						<AnimatePresence
							key={listObject.id}
							initial={false}>
							<div className="mb-8">
								<CreateTask />
							</div>
							<div className="flex justify-between p-2 px-4 bg-zinc-900 bg-opacity-10 text-surface-12 rounded-xl mb-2">
								<h2 className="font-semibold">{listObject.name}</h2>
								<h2 className="font-semibold uppercase flex items-center gap-2 text-surface-10">
									02:47:00
									<button className="p-1">
										<PlayIcon className="w-4 h-4" />
									</button>
								</h2>
							</div>

							{tasksForList.map((task) => (
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
