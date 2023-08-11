import InboxListItem from './item';
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

export default function InboxList(props) {
	const { isOver, setNodeRef } = useDroppable({
		id: 'droppable',
	});
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor),
	);
	const style = {
		color: isOver ? 'green' : undefined,
	};

	return (
		<div className="min-h-full px-1 py-2 overflow-x-clip">
			<DndContext sensors={sensors}>
				<ul
					ref={setNodeRef}
					className="h-full list-disc">
					<InboxListItem />
				</ul>
			</DndContext>
		</div>
	);
}
