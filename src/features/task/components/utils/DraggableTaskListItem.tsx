import { useDraggable } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { CSS } from '@dnd-kit/utilities';

export const DraggableTaskListItem = (props: {
	children: ReactNode;
	id: string;
}) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: props.id,
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
			{props.children}
		</div>
	);
};
