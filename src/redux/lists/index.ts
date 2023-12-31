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
		{
			id: 'work',
			name: 'Work',
			color: 'red',
			tasks: [],
			columns: defaultKanbanBoards,
		},
	],
};

export const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		setColumn: (state, action) => {
			const { taskId, projectId, columnId } = action.payload;
			const project = state.items.find((project) => project.id === projectId);
			const column = project.columns.find(
				(column) => column.title === columnId,
			);
			column.items = Array.from(new Set<string>([...column.items, taskId]));
		},
		addListItem: (state, action) => {
			state.items.push(action.payload);
		},
		moveTaskBetweenColumns: (state, action) => {
			const { taskId, fromColumnId, toColumnId, projectId } = action.payload;

			if (fromColumnId === toColumnId) return;

			const projectIndex = state.items.findIndex(
				(project) => project.id === projectId,
			);
			const project = state.items[projectIndex];
			if (!project) return;

			if (!project.columns) {
				project.columns = defaultKanbanBoards;
			}

			const fromColumn = project.columns.findIndex(
				(column) => column.title === fromColumnId || column.id === fromColumnId,
			);
			const toColumn = project.columns.findIndex(
				(column) => column.title === toColumnId || column.id === toColumnId,
			);

			console.log({
				fromColumnId,
				columns: project.columns[fromColumn].items.map((item) =>
					item.toString(),
				),
			});

			project.columns[toColumn].items.push(taskId);
			project.columns[fromColumn].items = Array.from(
				new Set(
					project.columns[fromColumn].items.filter(
						(item) => item.toString() !== taskId,
					),
				),
			);
		},
		changeIndexOfTaskInColumn: (state, action) => {
			let { columnId, taskId, newIndex, oldIndex, projectId } = action.payload;

			const project = state.items.find((project) => project.id === projectId);

			// Find the column
			const columnIndex = project.columns.findIndex(
				(column) => column.title === columnId || column.id === columnId,
			);

			if (columnIndex === -1) return;

			const items = Array.from([...project.columns[columnIndex].items]);
			items.splice(oldIndex, 1);
			items.splice(newIndex, 0, taskId);
			project.columns[columnIndex].items = items;
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
			const { listId, taskId, columnId } = action.payload;
			const list = state.items.find((list) => list.id === listId);
			if (!list) return;

			const column = list.columns.findIndex((column) => column.id === columnId);
			list.columns[column].items.push(taskId);
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
	setColumn,
} = listSlice.actions;

export const selectAllLists = (state: RootState) => state.lists.items;

export const selectListById = (listId: string) => (state: RootState) => {
	const list = state.lists.items.find((list) => list.id === listId);
	if (!list) {
		list.columns = defaultKanbanBoards;
		if (listId === 'work')
			return {
				...state.lists.items.find((list) => list.id === 'work'),
				columns: defaultKanbanBoards,
			};
		return {
			...state.lists.items.find((list) => list.id === 'default'),
			columns: defaultKanbanBoards,
		};
	}

	if (!list.columns) {
		list.columns = defaultKanbanBoards;
		return { ...list, columns: defaultKanbanBoards };
	}

	return { ...list };
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

export const selectProjectProgress =
	(projectId: string) => (state: RootState) => {
		const project = state.lists.items.find(
			(project) => project.id === projectId,
		);

		if (!project) return 0;

		if (project.tasks.length === 0) return 1;

		const completeTasks = state.tasks.items.filter(
			(task) => project.tasks.includes(task.id) && task.complete,
		);

		// completeTasks/project.tasks.length
		return completeTasks.length / project.tasks.length;
	};

export const selectTasksForColumnInProject =
	(projectId: string, columnId: string) => (state: RootState) => {
		const project = state.lists.items.find(
			(project) => project.id === projectId,
		);

		if (!project) return [];

		const column = project.columns.find((column) => column.title === columnId);

		const tasksInColumn = column.items.map((item) => {
			return state.tasks.items.find((task) => task.id === item);
		});

		return tasksInColumn;
	};
