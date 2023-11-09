import {
	ChevronDownIcon,
	ChevronUpIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ArrowsExpand from '../../icons/ArrowsExpand';
import SnackTooltip, { TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ProjectList from '../misc/lists/ProjectsList';
import { SelectStatus } from './TaskExpandedView';
import useTaskFunctions from './hooks/useTaskFunctions';
import { useAppSelector } from '../../redux/store';
import { selectTaskById } from '../../redux/tasks';
import TaskPageView from './TaskPageView';
import { useEffect } from 'react';

export default function TaskSidebar(props: {
	onSelectTask: (id: string) => void;
	onNextItem: () => void;
	onPrevItem: () => void;
	selectedTask: string;
}) {
	const task = useAppSelector(selectTaskById(props.selectedTask));

	useEffect(() => {
		const kbdListener = (event: KeyboardEvent) => {
			// Close
			if (event.key === 'Escape') props.onSelectTask(null);

			// Next and previous item
			if (event.key === 'ArrowUp') props.onPrevItem();
			if (event.key === 'ArrowDown') props.onNextItem();

			event.preventDefault();
			event.stopPropagation();
		};

		window.addEventListener('keydown', kbdListener);

		return () => window.removeEventListener('keydown', kbdListener);
	}, [props.onSelectTask, props.onPrevItem, props.onNextItem]);

	const {
		changeStatus,
		onUpdateTask,
		changeList,
		openInPage,
		list,
		onDeadlineChanged,
		onTitleChange,
		onDescriptionChange,
	} = useTaskFunctions(task);

	return (
		<motion.div className="w-1/2 border-l border-zinc-400/30 shadow-xl h-full absolute right-0 z-20 bg-white top-0 overflow-y-auto">
			<div className="flex gap-8 border-b py-2 px-4 sticky bg-white top-0 z-30">
				<div className="flex gap-1 items-center rounded-lg border border-zinc-400/20">
					<SnackTooltip>
						<TooltipTrigger>
							<button
								onClick={() => props.onSelectTask(null)}
								className="p-1 rounded hover:bg-surface-3">
								<XMarkIcon className="w-6 h-6" />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Close</p>
						</TooltipContent>
					</SnackTooltip>
					<SnackTooltip>
						<TooltipTrigger>
							<button
								onClick={openInPage}
								className="p-1 hover:bg-surface-3 rounded">
								<ArrowsExpand className="w-5 h-5" />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Open as page</p>
						</TooltipContent>
					</SnackTooltip>
					<div className="flex items-center gap-0 border-l border-zinc-400/20 p-0.5">
						<SnackTooltip>
							<TooltipTrigger>
								<button
									onClick={props.onNextItem}
									className="p-1 rounded hover:bg-surface-3">
									<ChevronUpIcon className="w-5 h-5" />
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Previous item</p>
							</TooltipContent>
						</SnackTooltip>
						<SnackTooltip>
							<TooltipTrigger>
								<button
									onClick={props.onPrevItem}
									className="p-1 rounded hover:bg-surface-3">
									<ChevronDownIcon className="w-5 h-5" />
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Next item</p>
							</TooltipContent>
						</SnackTooltip>
					</div>
				</div>
				<div className="flex gap-4">
					<SelectStatus
						status={task.status}
						onChange={changeStatus}
					/>
					<ProjectList
						defaultListId={list.id}
						onChange={changeList}
					/>
				</div>
			</div>
			<div className="w-full text-base font-normal text-surface-11 overflow-y-auto overflow-x-visible pb-12">
				<TaskPageView
					id={props.selectedTask}
					addPadding
				/>
			</div>
		</motion.div>
	);
}
