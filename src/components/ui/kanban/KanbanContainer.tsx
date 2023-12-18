import { DndContext, KeyboardSensor, closestCorners } from '@dnd-kit/core';
import { ReactNode, useState } from 'react';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { selectListById, selectTasksByListId } from '../../../redux/lists';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const findColumn = (id: string) => id.split('-')[1];

const KanbanBoard = (props: {
	children: ReactNode;
	projectId: string;
	onExpandTask: (id: string) => void;
	onChangeBoard: (id: string, newBoard: string, oldBoard: string) => void;
	onChangeIndex: (id: string, idx: number, newIdx, columnId: string) => void;
}) => {
	const allTasksInProject = useAppSelector(
		selectTasksByListId(props.projectId),
	);
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 4,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragOver = (event) => {
		const { over, active } = event;
		const { id: activeItemId } = active;
		const { id: overId } = over;

		if (!activeItemId || !overId || activeItemId === overId) return;
		console.log({ event });

		const toContainerId = !over.data.current
			? overId.split('-')[1]
			: over.data.current.sortable.containerId;

		const fromContainerId = active.data.current.sortable.containerId;

		props.onChangeBoard(activeItemId, toContainerId, fromContainerId);

		return;

		if (overId.split('-')[0] !== 'column') {
			// TODO: Check which column the item thats over is contained in
			const task = allTasksInProject.find((task) => task.id === overId);
			console.log({ event, overId });

			props.onChangeBoard(
				activeItemId,
				task.status,
				active.data.current.sortable.containerId,
			);
			return;
		}

		props.onChangeBoard(
			activeItemId,
			overId.split('-')[1],
			active.data.current.sortable.containerId,
		);
	};

	const onDragEnd = (event) => {
		const { over, active } = event;
		console.log({ over });
		if (over.data.current) {
			const newIndex = over.data.current.sortable.index;
			const oldIndex = active.data.current.sortable.index;

			const containerId = over.data.current.sortable.containerId;

			const { id: itemId } = active;
			props.onChangeIndex(itemId, oldIndex, newIndex, containerId);
		}
	};

	return (
		<div className="flex items-start gap-4 h-full overflow-x-auto py-2 px-4">
			<DndContext
				onDragEnd={onDragEnd}
				onDragOver={handleDragOver}
				collisionDetection={closestCorners}
				sensors={sensors}>
				{props.children}
			</DndContext>
		</div>
	);
};

export default KanbanBoard;
