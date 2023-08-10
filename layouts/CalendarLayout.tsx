import NavigationSidebar from '../components/nav/SidebarNavigation';
import { DndContext } from '@dnd-kit/core';
import Calendar from '../components/calendar';
import { CalendarView } from '../components/calendar/types';

export default function CalendarLayout(props) {
	return (
		<DndContext>
			<div className="flex flex-col h-screen overflow-y-hidden">
				<div
					className={
						'w-full flex flex-1 items-start bg-stone-200 bg-opacity-70 bg-blend-overlay backdrop-blur-xl h-[calc(100vh-4rem)]'
					}>
					<NavigationSidebar />
					<Calendar view={CalendarView.Week} />
				</div>
			</div>
		</DndContext>
	);
}
