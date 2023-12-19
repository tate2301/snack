import { createSlice } from '@reduxjs/toolkit';
import { isEqual, startOfDay } from 'date-fns';
import { RootState } from '../store';

const initialState: {
	days: ReduxTimeServiceState[];
} = {
	days: [
		{
			day: {
				date: new Date(),
				totalTime: 0,
			},
			tasks: [],
			idle: [],
			breaks: [],
			tracked: [],
		},
	],
};

export const timeServiceSlice = createSlice({
	name: 'timeService',
	initialState,
	reducers: {
		startNewDay: (state, action) => {
			const { date } = action.payload;
			state.days.push({
				day: {
					date,
					totalTime: 0,
				},
				tasks: [],
				idle: [],
				breaks: [],
				tracked: [],
			});
		},
		logTotalTrackedToday: (state, action) => {
			const { date, totalToday } = action.payload;
			const dayIdx = state.days.findIndex((item) =>
				isEqual(startOfDay(item.day.date), startOfDay(date)),
			);

			if (dayIdx === -1) return;

			state.days[dayIdx].day.totalTime = totalToday;
		},
		startTrackingTask: (state, action) => {
			const { date, id, startTime } = action.payload;
			const dayIdx = state.days.findIndex((item) =>
				isEqual(startOfDay(item.day.date), startOfDay(date)),
			);

			if (dayIdx === -1) return;

			state.days[dayIdx].tasks.push({
				id,
				startTime,
				endTime: null,
			});
		},
		stopTrackingTask: (state, action) => {
			const { date, id, endTime } = action.payload;
			const dayIdx = state.days.findIndex((item) =>
				isEqual(startOfDay(item.day.date), startOfDay(date)),
			);

			if (dayIdx === -1) return;

			const taskIdx = state.days[dayIdx].tasks.findIndex(
				(task) => task.id === id,
			);

			state.days[dayIdx].tasks[taskIdx].endTime = endTime;
		},
		stopTrackingAllTasks: (state, action) => {
			const { date, endTime, totalTime } = action.payload;
			const dayIdx = state.days.findIndex((item) =>
				isEqual(startOfDay(item.day.date), startOfDay(date)),
			);

			if (dayIdx === -1) return;

			state.days[dayIdx].tasks = state.days[dayIdx].tasks.map((item) => {
				if (!item.endTime) item.endTime = endTime;
				return item;
			});

			state.days[dayIdx].day.totalTime = totalTime;
		},
		logTrackedTime: (state, action) => {
			const { date, startTime, endTime } = action.payload;
			const dayIdx = state.days.findIndex((item) =>
				isEqual(startOfDay(item.day.date), startOfDay(date)),
			);

			if (dayIdx === -1) return;

			state.days[dayIdx].tracked.push({ startTime, endTime });
		},
		logBreak: (state, action) => {
			const { date, startTime, endTime } = action.payload;
			const dayIdx = state.days.findIndex((item) =>
				isEqual(startOfDay(item.day.date), startOfDay(date)),
			);

			if (dayIdx === -1) return;

			state.days[dayIdx].breaks.push({ startTime, endTime });
		},
		logIdle: (state, action) => {
			const { date, startTime, endTime } = action.payload;
			const dayIdx = state.days.findIndex((item) =>
				isEqual(startOfDay(item.day.date), startOfDay(date)),
			);

			if (dayIdx === -1) return;

			state.days[dayIdx].idle.push({ startTime, endTime });
		},
	},
});

export const {
	startNewDay,
	logTrackedTime,
	startTrackingTask,
	stopTrackingTask,
	stopTrackingAllTasks,
	logBreak,
	logIdle,
} = timeServiceSlice.actions;

export default timeServiceSlice.reducer;

export const applicationTimeService = (state: any) => state.timeService;

export const selectDay = (date: Date) => (state: RootState) =>
	state.timeService.days.find((day) =>
		isEqual(startOfDay(day.day.date), startOfDay(date)),
	);
