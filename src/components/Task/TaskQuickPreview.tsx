import {
	ChevronDownIcon,
	ChevronUpIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import ArrowsExpand from '../../icons/ArrowsExpand';
import SnackTooltip, { TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ProjectList from '../misc/lists/ProjectsList';
import { SelectStatus } from './TaskExpandedView';
import useTaskFunctions from './hooks/useTaskFunctions';
import { useAppSelector } from '../../redux/store';
import { selectTaskById } from '../../redux/tasks';
import TaskPageView from './TaskPageView';
import { useEffect, useRef } from 'react';
import Modal from '../ui/modal';
import Kbd from '../ui/typography/Kbd';
import { selectListByTaskId } from '../../redux/lists';
import DestructiveActionButton from '../ui/destructive-action';

export default function TaskQuickPreview(props: {
	onSelectTask: (id: string) => void;
	onNextItem: () => void;
	onPrevItem: () => void;
	onClose: () => void;
	selectedTask: string;
	isOpen: boolean;
}) {
	const containerRef = useRef<HTMLDivElement>();
	const task = useAppSelector(selectTaskById(props.selectedTask));
	const list = useAppSelector(selectListByTaskId(task.id));

	useEffect(() => {
		if (containerRef.current && props.selectedTask) {
			containerRef.current.scrollTop = 0;
		}
	}, [props.selectedTask, containerRef.current]);

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
		onDeleteTask,
		changeList,
		openInPage,
		onDeadlineChanged,
		onTitleChange,
		onDescriptionChange,
	} = useTaskFunctions(task);

	if (!task) return null;

	return (
		<Modal
			noPadding
			actionCenter={
				<div className="w-full flex items-center justify-between">
					<div className="flex space-x-4">
						<div className="flex items-center">
							<SnackTooltip>
								<TooltipTrigger>
									<button
										onClick={props.onNextItem}
										className="p-1 rounded hover:bg-surface-6 bg-surface-4">
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
										className="p-1 rounded hover:bg-surface-6 bg-surface-4">
										<ChevronDownIcon className="w-5 h-5" />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Next item</p>
								</TooltipContent>
							</SnackTooltip>
							<p className="font-medium ml-2 text-surface-11">Navigate</p>
						</div>
						<div className="flex gap-2 items-center">
							<p>
								<Kbd keys={['Esc']} />
							</p>
							<p className="font-medium text-surface-11">Close</p>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<DestructiveActionButton
							action={onDeleteTask}
							message="Are you sure to delete this task?">
							<button className="px-2 py-1 rounded-lg bg-danger-4 text-danger-11">
								<TrashIcon className="w-5 h-5" />
								Delete task
							</button>
						</DestructiveActionButton>
					</div>
				</div>
			}
			isOpen={props.isOpen}
			onClose={props.onClose}>
			<div>
				<div className="flex gap-8 w-full rounded-t-lg sticky border-b p-2 justify-between bg-white top-0 z-30 overflow-hidden">
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
					<div className="flex gap-1 items-center rounded-lg">
						<SnackTooltip>
							<TooltipTrigger>
								<button
									onClick={openInPage}
									className="p-1.5 hover:bg-surface-3 rounded">
									<ArrowsExpand className="w-5 h-5" />
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Detailed view</p>
							</TooltipContent>
						</SnackTooltip>
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
					</div>
				</div>
				<div
					ref={containerRef}
					className="w-full text-base font-normal text-surface-11 overflow-y-auto h-[70vh] xl:h-[60vh] overflow-x-visible">
					<TaskPageView
						id={props.selectedTask}
						addPadding
					/>
				</div>
			</div>
		</Modal>
	);
}
