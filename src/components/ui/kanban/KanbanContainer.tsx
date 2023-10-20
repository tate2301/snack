import { DndContext, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { ReactNode, useState } from 'react';
import {
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/store';
import { selectListById } from '../../../redux/lists';

const KanbanBoard = (props: { children: ReactNode; projectId: string }) => {
	const dispatch = useDispatch();
	const project = useAppSelector(selectListById(props.projectId));
	const [items, setItems] = useState(project.tasks);
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
	const [activeId, setActiveId] = useState(null);

	const handleDragStart = (event) => {
		setActiveId(event.active.id);
	};

	const onDragEnd = (event) => {
		console.log({ event });
	};

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
