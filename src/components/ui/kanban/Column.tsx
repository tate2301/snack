'use client';

import { motion } from 'framer-motion';
import TaskListItem, { TaskListItemView } from '../../Home/TaskListItem';
import { ReactNode, useContext } from 'react';
import { SnackTask } from '../../../redux/tasks/types';
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CommandContext } from '../../../context/CommandContext';
import { useAppSelector } from '../../../redux/store';
import { selectTaskById } from '../../../redux/tasks';
import { selectTasksByListId } from '../../../redux/lists';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const Column = (props: {
	title: string;
	items: Array<string>;
	projectId: string;
	id: string;
	icon: ReactNode;
	onExpandTask: (id: string) => void;
}) => {
	const { openCreateTask } = useContext(CommandContext);
	const tasks = useAppSelector(selectTasksByListId(props.projectId));
	const onAddTask = () => openCreateTask(props.id);
	const columnTasks = tasks.filter((task) => task.status === props.title);

	const {
		active,
		attributes,
		isDragging,
		listeners,
		over,
		setNodeRef,
		transition,
		transform,
	} = useSortable({
		id: props.id,
		data: {
			type: 'container',
			children: columnTasks.map((task) => task.id),
		},
	});

	return (
		<SortableContext
			id={props.id}
			items={columnTasks.map((task) => task.id)}
			strategy={verticalListSortingStrategy}>
			<div
				ref={setNodeRef}
				style={{
					transition,
					transform: CSS.Translate.toString(transform),
					opacity: isDragging ? 0.5 : undefined,
				}}
				className="w-96 flex-shrink-0 rounded-xl px-2 py-2 bg-surface-3">
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
				{columnTasks.length > 0 && (
					<div className="flex flex-col gap-1 mt-4 mb-2">
						{columnTasks.map((task) => (
							<ColumnItem
								id={task.id}
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
	);
};

export const ColumnItem = (props: {
	id: string;
	onExpandTask: (id: string) => void;
}) => {
	const task = useAppSelector(selectTaskById(props.id));
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}>
			<TaskListItem
				key={task.id}
				view={TaskListItemView.Grid}
				onExpandTask={() => props.onExpandTask(task.id)}
				{...task}
			/>
		</div>
	);
};

export default Column;
