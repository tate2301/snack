import NavigationSidebar from '../components/nav/SidebarNavigation';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import clsx from 'clsx';

export default function CalendarLayout(props) {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const onDragEnd = (event) => {
		console.log(event);
	};
	return (
		<DndContext
			onDragEnd={onDragEnd}
			sensors={sensors}>
			<div className="flex flex-col h-screen overflow-hidden bg-surface-4 relative ">
				<div
					className={
						'w-full flex flex-1 items-start h-[calc(100vh-2.5rem)] justify-between'
					}>
					<NavigationSidebar />
					<div
						className={clsx('h-full p-4 pt-16 mx-auto max-w-screen-sm w-full')}>
						{props.children}
					</div>
				</div>
			</div>
		</DndContext>
	);
}
