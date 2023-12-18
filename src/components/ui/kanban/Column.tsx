'use client';
import TaskListItem, {
	TaskListItemView,
} from '../../../features/task/components/TaskListItem';
import { ReactNode, useContext } from 'react';
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CommandContext } from '../../../context/CommandContext';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SnackTask } from '../../../redux/tasks/types';

const Column = (props: {
	title: string;
	items: Array<SnackTask>;
	projectId: string;
	id: string;
	icon: ReactNode;
	onExpandTask: (id: string) => void;
}) => {
	const { openCreateTask } = useContext(CommandContext);
	const onAddTask = () => openCreateTask(props.projectId);

	const { setNodeRef } = useDroppable({
		id: `column-${props.id}`,
	});

	return (
		<div ref={setNodeRef}>
			<SortableContext
				id={props.id}
				items={props.items.map((task) => task.id)}
				strategy={verticalListSortingStrategy}>
				<div className="w-96 flex-shrink-0 rounded-xl px-2 py-2 bg-surface-3">
					<div className="flex justify-between px-2">
						<div className="flex gap-2 items-center">
							{props.icon}
							<p className="font-semibold text-surface-12">{props.title}</p>
							<p
								className="py-0.5 px-2 rounded-lg
					 bg-surface-5">
								{props.items.length}
							</p>
						</div>
						<button className="p-2 rounded-xl hover:bg-zinc-900/10">
							<EllipsisHorizontalIcon className="w-5 h-5" />
						</button>
					</div>
					{props.items.length > 0 && (
						<div className="flex flex-col gap-1 mt-4 mb-2">
							{props.items.map((task) => (
								<ColumnItem
									task={task}
									onExpandTask={props.onExpandTask}
								/>
							))}
						</div>
					)}
					<button
						onClick={onAddTask}
						className="py-2 px-4 rounded-xl flex gap-2 hover:bg-zinc-900/10 mb-1">
						<PlusIcon className="w-5 h-5" />
						Add task
					</button>
				</div>
			</SortableContext>
		</div>
	);
};

export const ColumnItem = (props: {
	task: SnackTask;
	onExpandTask: (id: string) => void;
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: props.task.id,
		});

	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}>
			<TaskListItem
				key={props.task.id}
				view={TaskListItemView.Grid}
				onSelectTask={() => props.onExpandTask(props.task.id)}
				onExpandTask={() => props.onExpandTask(props.task.id)}
				{...props.task}
			/>
		</div>
	);
};

export default Column;
