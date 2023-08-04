import InboxListItem from './item';
import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

export default function InboxList(props) {
	const { isOver, setNodeRef } = useDroppable({
		id: 'droppable',
	});
	const style = {
		color: isOver ? 'green' : undefined,
	};

	return (
		<div className="px-1 py-2">
			<ul className="h-full list-disc">
				<InboxListItem />
			</ul>
			<div
				ref={setNodeRef}
				className={clsx('w-full py-12', isOver && 'bg-green-200')}
			/>
		</div>
	);
}
