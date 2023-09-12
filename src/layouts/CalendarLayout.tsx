import React from 'react';

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
			<div className="relative flex flex-col h-screen overflow-hidden bg-surface-2">
				<div
					className={
						'w-full flex flex-1 items-start h-[calc(100vh-2.5rem)] justify-between'
					}>
					<NavigationSidebar />
					<div
						id="main"
						className={clsx('h-full flex-1 overflow-y-auto')}>
						{props.children}
						<div className="h-16" />
					</div>
				</div>
			</div>
		</DndContext>
	);
}
