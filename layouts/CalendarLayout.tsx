import NavigationSidebar from '../components/nav/SidebarNavigation';
import { DndContext } from '@dnd-kit/core';
import Calendar from '../components/calendar';
import { CalendarView } from '../components/calendar/types';
import { MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ArrowsExpand from '../icons/ArrowsExpand';
import AppRouter from '../components/nav/AppRouter';

export default function CalendarLayout(props) {
	return (
		<DndContext>
			<div className="flex flex-col h-screen overflow-y-hidden">
				<nav className="flex items-center justify-between flex-shrink-0 w-full h-12 px-2 bg-surface-3">
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
						'w-full flex flex-1 items-start bg-surface-3 h-[calc(100vh-2.5rem)] border-t'
					}>
					<NavigationSidebar />
					<div className="w-[32rem] h-full">
						<AppRouter />
					</div>
					<Calendar view={CalendarView.Week} />
				</div>
			</div>
		</DndContext>
	);
}
