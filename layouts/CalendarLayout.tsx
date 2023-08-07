import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import WeekView from '../components/calendar/views/WeekView';
import NavigationSidebar from '../components/nav/SidebarNavigation';
import ContextSidebar from '../components/ContextSidebar';
import { DndContext } from '@dnd-kit/core';
import Calendar from '../components/calendar';
import { CalendarView } from '../components/calendar/types';

export default function CalendarLayout(props) {
	return (
		<DndContext>
			<div className="flex flex-col h-screen overflow-y-hidden">
				<nav className="flex items-center justify-between flex-shrink-0 w-full h-12 text-white border-b bg-zinc-950 ">
					<p className="p-2 px-3 text-sm font-semibold uppercase rounded-lg ">
						DEV
					</p>
					<div className="flex">
						<button className="p-4 hover:bg-zinc-100">
							<span className="w-4 h-4 border rounded-full" />
						</button>
						<button className="p-4 hover:bg-zinc-100">
							<span className="w-4 h-4 border rounded-full" />
						</button>
						<button className="p-4 hover:bg-zinc-100">
							<span className="w-4 h-4 border rounded-full" />
						</button>
					</div>
				</nav>
				<div
					className={
						'w-full flex flex-1 items-start bg-stone-100 h-[calc(100vh-4rem)]'
					}>
					<NavigationSidebar />
					<Calendar view={CalendarView.Week} />
				</div>
			</div>
		</DndContext>
	);
}
