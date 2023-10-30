import React, { useState } from 'react';
import {
	DndContext,
	closestCorners,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	PointerSensor,
	KeyboardSensor,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableKanbanBoard() {
	const [columns, setColumns] = useState([
		{ id: 'column1', items: ['item1', 'item2', 'item3'] },
		{ id: 'column2', items: ['item4', 'item5', 'item6'] },
	]);

	const onDragEnd = (event) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = columns.findIndex((column) => column.id === active.id);
			const newIndex = columns.findIndex((column) => column.id === over.id);
			setColumns(arrayMove(columns, oldIndex, newIndex));
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	return (
		<DndContext
			onDragEnd={onDragEnd}
			collisionDetection={closestCorners}
			sensors={sensors}>
			{columns.map((column, index) => (
				<Column
					key={column.id}
					items={column.items}
				/>
			))}
		</DndContext>
	);
}

function Column({ items }) {
	return (
		<SortableContext
			items={items}
			strategy={verticalListSortingStrategy}>
			{items.map((i) => (
				<SortableItem id={i}>{i}</SortableItem>
			))}
		</SortableContext>
	);
}

function SortableItem({ id, children }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<div
			className="border p-2"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}>
			<div>{children}</div>
		</div>
	);
}

export default SortableKanbanBoard;
