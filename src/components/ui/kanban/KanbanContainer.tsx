import { DndContext, KeyboardSensor, closestCorners } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const KanbanBoard = (props: {
	children: ReactNode;
	projectId: string;
	onExpandTask: (id: string) => void;
	onChangeBoard: (id: string, newBoard: string, oldBoard: string) => void;
	onChangeIndex: (id: string, idx: number, newIdx, columnId: string) => void;
}) => {
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
