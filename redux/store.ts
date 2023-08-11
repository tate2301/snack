import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const calendarsReducer = (state = [], action) => {
	return state;
};

const listsReducer = (state = [], action) => {
	return state;
};

const eventsReducer = (state = [], action) => {
	return state;
};

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
		calendars: calendarsReducer,
		lists: listsReducer,
		events: eventsReducer,
		reminders: remindersReducer,
		user: userReducer,
		settings: settingsReducer,
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

export default store;
