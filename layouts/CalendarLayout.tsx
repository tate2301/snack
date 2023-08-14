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
				<nav className="flex items-center justify-between flex-shrink-0 w-full h-12 px-2">
					<div className="flex items-center flex-1 h-full gap-2 px-2">
						<p className="font-semibold uppercase">Snack</p>
						<p className="px-2 py-0.5 bg-warning-10 text-surface-12 text-sm font-semibold uppercase rounded-lg ">
							DEV
						</p>
					</div>
					<div className="flex gap-1">
						<button className="p-2 rounded hover:bg-opacity-10 hover:bg-zinc-900 text-zinc-500">
							<MinusIcon className="w-6 h-6" />
						</button>
						<button className="p-2 px-3 rounded hover:bg-opacity-10 hover:bg-zinc-900 text-zinc-500">
							<ArrowsExpand className="w-5 h-5" />
						</button>
						<button className="p-2 rounded hover:bg-opacity-10 hover:bg-zinc-900 text-zinc-500">
							<XMarkIcon className="w-6 h-6" />
						</button>
					</div>
				</nav>
				<div
					className={
						'w-full flex flex-1 items-start h-[calc(100vh-2.5rem)] justify-between'
					}>
					<NavigationSidebar />
					<div
						className={clsx(
							'h-full p-4 mr-auto',
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
