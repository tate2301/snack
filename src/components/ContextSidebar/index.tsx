import React from "react";

import CollapseSidebarIcon from '../../icons/CollapseSidebarIcon';
import TaskList from '../Home/TaskList';

export default function ContextSidebar() {
	return (
		<>
			<main className="flex h-full w-[32rem] divide-x">
				<div className="flex flex-col items-center p-2">
					<button className="p-2 rounded-xl bg-white hover:bg-zinc-100">
						<CollapseSidebarIcon className="w-6 h-6" />
					</button>
				</div>
				<TaskList />
			</main>
		</>
	);
}
