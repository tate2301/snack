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
	onChangeIndex: (id: string, idx: number, columnId: string) => void;
}) => {
	const dispatch = useAppDispatch();
	const project = useAppSelector(selectListById(props.projectId));
	const allTasksInProject = useAppSelector(
		selectTasksByListId(props.projectId),
	);
	const [items, setItems] = useState(project.tasks);
	const [activeId, setActiveId] = useState(null);
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

		if (overId.split('-')[0] !== 'column') {
			// TODO: Check which column the item thats over is contained in
			const task = allTasksInProject.find((task) => task.id === overId);
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
		const { over } = event;
		if (over.data.current) {
			const newIndex = over.data.current.sortable.index;
			const containerId = over.data.current.sortable.containerId;

			const { id: itemId } = over;

			props.onChangeIndex(itemId, newIndex, containerId);
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
