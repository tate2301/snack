import NavigationSidebar from '../components/nav/SidebarNavigation';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import Calendar from '../components/calendar';
import { CalendarView } from '../components/calendar/types';
import { MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ArrowsExpand from '../icons/ArrowsExpand';
import clsx from 'clsx';
import { useAppSelector } from '../redux/store';
import { selectGlobalCalendar } from '../redux/calendar';

export default function CalendarLayout(props) {
	const globalCalendar = useAppSelector(selectGlobalCalendar);

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
						className={clsx(
							'h-full p-4 pt-16 mr-auto',
							!globalCalendar.preferences.expanded
								? 'flex-1 max-w-screen-md mx-auto'
								: 'max-w-screen-sm w-full',
						)}>
						{props.children}
					</div>
					<Calendar view={CalendarView.Week} />
				</div>
			</div>
		</DndContext>
	);
}
