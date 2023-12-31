import { createSlice } from '@reduxjs/toolkit';
import { SnackTask, SnackTaskStatus } from './types';
import { RootState } from '../store';
import _ from 'lodash';
import { differenceInDays, isEqual, startOfDay, startOfToday } from 'date-fns';
import { generateUUID } from '../../lib/functions';

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
				emoji,
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
				existingTask.emoji = emoji;
			}
		},
		pinTask: (state, action) => {
			const { id } = action.payload;
			const existingTask = state.items.find((task) => task.id === id);
			existingTask.pinned = true;
		},
		unpinTask: (state, action) => {
			const { id } = action.payload;
			const existingTask = state.items.find((task) => task.id === id);
			existingTask.pinned = false;
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
		updateSubtask: (state, action) => {
			const { id, title, complete, taskId } = action.payload;

			const task = state.items.find((task) => task.id === taskId);
			if (task) {
				const subtask = task.subtasks.find((subtask) => subtask.id === id);
				subtask.complete = complete;
				subtask.title = title;
			}
		},
		changeTaskStatus: (state, action) => {
			const { id, status } = action.payload;

			const existingTask = state.items.find((task) => task.id === id);

			existingTask.status = status;
		},
	},
});

export default tasksSlice.reducer;

export const {
	addTask,
	updateTask,
	deleteTask,
	addSubtask,
	deleteSubtask,
	updateSubtask,
	changeTaskStatus,
	pinTask,
	unpinTask,
} = tasksSlice.actions;

/** Selectors */
export const selectAllTasks = (state: RootState) => {
	return state.tasks.items.filter((task) => task.trashed !== true);
};

export const selectAllSubtasks = (state: RootState, id: string) =>
	state.tasks.items
		.filter((task) => task.trashed !== true)
		.find((task) => task.id === id)?.subtasks;

export const selectTaskByStatus = (state: RootState, status: string) =>
	state.tasks.items
		.filter((task) => task.trashed !== true)
		.filter((task) => task.status === status);

export const selectTaskById = (id: string) => (state: RootState) =>
	state.tasks.items
		.filter((task) => task.trashed !== true)
		.find((task) => task.id === id);

export const selectTaskByPriority = (state: RootState, priority: string) =>
	state.tasks.items
		.filter((task) => task.trashed !== true)
		.filter((task) => task.priority === priority);

export const selectTasksOfToday = (state: RootState, date: Date) =>
	state.tasks.items.filter((task) =>
		isEqual(
			startOfDay(new Date(task.deadline ?? task.createdAt)),
			startOfToday(),
		),
	);

export const selectBacklogTasks = (state: RootState) =>
	state.tasks.items.filter(
		(task) =>
			!task.complete &&
			!!task.deadline &&
			differenceInDays(startOfDay(new Date(task.deadline)), startOfToday()) < 0,
	);

export const selectUpcomingTasks = (state: RootState) =>
	state.tasks.items.filter(
		(task) =>
			!task.complete &&
			!!task.deadline &&
			differenceInDays(startOfDay(new Date(task.deadline)), startOfToday()) > 0,
	);
