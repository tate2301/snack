import {
	DndContext,
	DragOverlay,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	closestCorners,
	useDroppable,
} from '@dnd-kit/core';
import { ReactNode, useCallback, useState } from 'react';
import {
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
	changeIndexOfTaskInColumn,
	moveTaskBetweenColumns,
	selectListById,
} from '../../../redux/lists';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ColumnItem } from './Column';

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
	const [items, setItems] = useState(project.tasks);
	const [activeId, setActiveId] = useState(null);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	// const handleDragOver = (event) => {
	// 	const { over, active } = event;
	// 	const { id: activeItemId } = active;
	// 	const { id: overColumnId } = over;

	// 	if (!activeItemId || !overColumnId) return;

	// 	console.log({ event });

	// 	dispatch(
	// 		moveTaskBetweenColumns({
	// 			taskId: activeItemId,
	// 			toColumnId: over.data.current.sortable.containerId,
	// 			fromColumnId: active.data.current.sortable.containerId,
	// 			projectId: props.projectId,
	// 		}),
	// 	);
	// };

	const onDragEnd = (event) => {
		const { over } = event;
		const newIndex = over.data.current.sortable.index;
		const containerId = over.data.current.sortable.containerId;

		const { id: itemId } = over;

		props.onChangeIndex(itemId, newIndex, containerId);
	};

	return (
		<div className="flex items-start gap-4 h-full overflow-x-auto py-2 px-4">
			<DndContext
				onDragEnd={onDragEnd}
				collisionDetection={closestCorners}
				sensors={sensors}>
				{props.children}
			</DndContext>
		</div>
	);
};

const DD = () => {
	const { setNodeRef, over, isOver, active } = useDroppable({ id: 'myid' });
	console.log({ over, isOver, active });
	return (
		<div
			className="w-96 h-96 border"
			ref={setNodeRef}></div>
	);
};

export default KanbanBoard;
