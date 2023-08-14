import { createSlice } from '@reduxjs/toolkit';
import { SnackTask, SnackTaskStatus } from './types';
import { RootState } from '../store';
import _ from 'lodash';

const initialState: {
	items: SnackTask[];
} = {
	items: [],
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.items.push(action.payload);
		},
		deleteTask: (state, action) => {
			state.items = state.items.filter((task) => task.id !== action.payload);
		},
		updateTask: (state, action) => {
			const {
				id,
				title,
				description,
				status,
				complete,
				deadline,
				priority,
				tags,
				link,
				trashed,
			} = action.payload as SnackTask;
			const existingTask = state.items.find((task) => task.id === id);
			if (existingTask) {
				existingTask.title = title;
				existingTask.description = description;
				existingTask.status = status;
				existingTask.complete = complete;
				existingTask.deadline = deadline;
				existingTask.priority = priority;
				existingTask.tags = tags;
				existingTask.link = link;
				existingTask.lastUpdated = new Date();
				existingTask.trashed = trashed;
			}
		},
		addSubtask: (state, action) => {
			const { id, subtask } = action.payload;
			const existingTask = state.items.find((task) => task.id === id);
			if (existingTask) {
				existingTask.subtasks.push(subtask);
				existingTask.lastUpdated = new Date();
			}
		},
		deleteSubtask: (state, action) => {
			const { id, subtaskId } = action.payload;
			const existingTask = state.items.find((task) => task.id === id);
			if (existingTask) {
				existingTask.subtasks = existingTask.subtasks.filter(
					(task) => task.id !== subtaskId,
				);
				existingTask.lastUpdated = new Date();
			}
		},
	},
});

export default tasksSlice.reducer;

export const { addTask, updateTask, deleteTask, addSubtask, deleteSubtask } =
	tasksSlice.actions;

/** Selectors */
export const selectAllTasks = (state: RootState) =>
	_.sortBy(
		state.tasks.items.filter((task) => task.trashed !== true),
		(task) => task.createdAt.getTime(),
	).reverse();

export const selectAllSubtasks = (state: RootState, id: string) =>
	state.tasks.items
		.filter((task) => task.trashed !== true)
		.find((task) => task.id === id)?.subtasks;

export const selectTaskByStatus = (state: RootState, status: string) =>
	state.tasks.items
		.filter((task) => task.trashed !== true)
		.filter((task) => task.status === status);

export const selectTaskById = (state: RootState, id: string) =>
	state.tasks.items
		.filter((task) => task.trashed !== true)
		.find((task) => task.id === id);

export const selectTaskByPriority = (state: RootState, priority: string) =>
	state.tasks.items
		.filter((task) => task.trashed !== true)
		.filter((task) => task.priority === priority);
