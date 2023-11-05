import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SnackList } from './types';
import { SnackTaskStatus } from '../tasks/types';

export const defaultKanbanBoards = [
	{
		id: SnackTaskStatus.Todo,
		items: [],
		title: SnackTaskStatus.Todo,
	},
	{
		id: SnackTaskStatus.InProgress,
		items: [],
		title: SnackTaskStatus.InProgress,
	},
	{
		id: SnackTaskStatus.Complete,
		items: [],
		title: SnackTaskStatus.Complete,
	},
	{
		id: SnackTaskStatus.Blocked,
		items: [],
		title: SnackTaskStatus.Blocked,
	},
];

const initialState: {
	items: SnackList[];
} = {
	items: [
		{
			id: 'default',
			name: 'Personal',
			color: 'blue',
			tasks: [],
			columns: defaultKanbanBoards,
		},
	],
};

export const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		addListItem: (state, action) => {
			state.items.push(action.payload);
		},
		moveTaskBetweenColumns: (state, action) => {
			const { taskId, fromColumnId, toColumnId, projectId } = action.payload;

			const project = state.items.find((project) => project.id === projectId);
			if (!project) return;

			if (!project.columns) {
				project.columns = defaultKanbanBoards;
			}
		},
		changeIndexOfTaskInColumn: (state, action) => {
			const { columnId, taskId, newIndex, projectId } = action.payload;

			const project = state.items.find((project) => project.id === projectId);
			if (!project) return;

			const taskIndex = project.tasks.indexOf(taskId);
			if (taskIndex === -1) return;

			const [removed] = project.tasks.splice(taskIndex, 1);
			project.tasks.splice(newIndex, 0, removed);

			return;

			// // Find the column
			// const column = project.columns.find((column) => column.id === columnId);

			// if (!column) return;

			// // Reorder the tasks
			// const taskIndex = column.items.indexOf(taskId);
			// if (taskIndex === -1) return;

			// const [removed] = column.items.splice(taskIndex, 1);
			// column.items.splice(newIndex, 0, removed);
		},
		updateList: (state, action) => {
			const { id, name, color, icon, description } =
				action.payload as SnackList;
			const list = state.items.find((list) => list.id === id);
			if (!list) return;

			list.name = name;
			list.color = color;
			list.icon = icon;
			list.description = description;
		},
		removeList: (state, action) => {
			const { id } = action.payload;
			state.items = state.items.filter((list) => list.id !== id);
		},
		addTaskToList: (state, action) => {
			const { listId, taskId } = action.payload;
			const list = state.items.find((list) => list.id === listId);
			if (!list) return;

			list.tasks.push(taskId);
		},
		removeTaskFromList: (state, action) => {
			const { listId, taskId } = action.payload;
			const list = state.items.find((list) => list.id === listId);
			if (!list) return;

			list.tasks = list.tasks.filter((id) => id !== taskId);
		},
	},
});

export default listSlice.reducer;

export const {
	addListItem,
	addTaskToList,
	removeTaskFromList,
	updateList,
	removeList,
	moveTaskBetweenColumns,
	changeIndexOfTaskInColumn,
} = listSlice.actions;

export const selectAllLists = (state: RootState) => state.lists.items;

export const selectListById = (listId: string) => (state: RootState) => {
	const list = state.lists.items.find((list) => list.id === listId);
	if (!list) {
		return {
			...state.lists.items.find((list) => list.id === 'default'),
			columns: defaultKanbanBoards,
		};
	}

	return { ...list, columns: defaultKanbanBoards };
};

export const selectTasksByListId = (listId: string) => (state: RootState) => {
	const list = state.lists.items.find((list) => list.id === listId);
	if (!list) return [];

	const tasksInList = list.tasks.map((taskId) => {
		return state.tasks.items.find(
			(task) => task.id === taskId && !task.trashed,
		);
	});

	return tasksInList.filter((task) => !!task).reverse();
};

export const selectOverdueTasksByListID =
	(listId: string) => (state: RootState) => {
		const list = state.lists.items.find((list) => list.id === listId);
		if (!list) return [];

		const tasksInList = list.tasks.map((taskId) => {
			return state.tasks.items.find(
				(task) => task.id === taskId && !task.trashed,
			);
		});

		return tasksInList.filter(
			(task) =>
				!task.complete && task.deadline && task.deadline.getTime() < Date.now(),
		);
	};

export const selectListByTaskId = (taskId: string) => (state: RootState) => {
	return (
		state.lists.items.find((list) => list.tasks.includes(taskId)) ??
		state.lists.items[0]
	);
};

export const selectTasksByColumnInList =
	(projectId: string, columnId: string) => (state: RootState) => {
		const project = state.lists.items.find(
			(project) => project.id === projectId,
		);

		if (!project) return [];

		const tasks = project.tasks.map((item) =>
			state.tasks.items.find((task) => item === task.id),
		);

		const tasksInColumn = tasks.filter((task) => task.status === columnId);

		return tasksInColumn;
	};
