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

	const onDragEnd = (event) => {};
	return (
		<DndContext
			onDragEnd={onDragEnd}
			sensors={sensors}>
			<div className="relative flex flex-col w-screen h-screen overflow-hidden bg-surface-3">
				<div
					className={
						'w-full flex flex-1 items-start h-[calc(100vh-2.5rem)] justify-between'
					}>
					<NavigationSidebar />
					<div
						className={clsx(
							'h-full overflow-y-auto flex-1 border-l border-zinc-400/30 bg-white',
						)}>
						{props.children}
					</div>
				</div>
			</div>
		</DndContext>
	);
}
