import { DndContext } from '@dnd-kit/core';
import { ReactNode } from 'react';
import {
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const KanbanBoard = (props: { children: ReactNode }) => {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const onDragEnd = (event) => {};
	return (
		<div className="flex items-start gap-4 h-full overflow-x-auto py-2 px-4">
			<DndContext
				onDragEnd={onDragEnd}
				collisionDetection={closestCenter}
				sensors={sensors}>
				{props.children}
			</DndContext>
		</div>
	);
};

export default KanbanBoard;
