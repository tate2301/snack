import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SnackList } from './types';

const initialState: {
	items: SnackList[];
} = {
	items: [
		{
			id: 'default',
			name: 'Personal',
			color: 'blue',
			tasks: [],
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
} = listSlice.actions;

export const selectAllLists = (state: RootState) => state.lists.items;

export const selectListById = (listId: string) => (state: RootState) => {
	const list = state.lists.items.find((list) => list.id === listId);
	if (!list) return state.lists.items.find((list) => list.id === 'default');
	return list;
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