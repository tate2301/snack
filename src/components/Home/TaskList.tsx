import React from "react";

import TaskListSection from './TaskListSection';

export default function TaskList() {
	return (
		<div className="flex-1 py-2">
			<TaskListSection title={'Work'} />
			<TaskListSection title={'Personal'} />
		</div>
	);
}
