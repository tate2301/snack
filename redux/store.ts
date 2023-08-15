import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { tasksSlice } from './tasks';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { calendarSlice } from './calendar';
import { eventsSlice } from './events';
import { listSlice } from './lists';

const remindersReducer = (state = [], action) => {
	return state;
};

const userReducer = (state = {}, action) => {
	return state;
};

const settingsReducer = (state = {}, action) => {
	return state;
};

const store = configureStore({
	reducer: {
		calendars: calendarSlice.reducer,
		lists: listSlice.reducer,
		events: eventsSlice.reducer,
		reminders: remindersReducer,
		user: userReducer,
		settings: settingsReducer,
		tasks: tasksSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		const defaultMiddleware = getDefaultMiddleware({
			serializableCheck: false,
		});
		if (process.env.NODE_ENV === 'development') {
			return defaultMiddleware.concat(
				createLogger({ level: 'info', collapsed: true }),
			);
		}
		return defaultMiddleware;
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
