import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { tasksSlice } from './tasks';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { calendarSlice } from './calendar';
import { eventsSlice } from './events';
import { listSlice } from './lists';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const remindersReducer = (state = [], action) => {
	return state;
};

const userReducer = (state = {}, action) => {
	return state;
};

const settingsReducer = (state = {}, action) => {
	return state;
};

const rootReducer = combineReducers({
	calendars: calendarSlice.reducer,
	lists: listSlice.reducer,
	events: eventsSlice.reducer,
	reminders: remindersReducer,
	user: userReducer,
	settings: settingsReducer,
	tasks: tasksSlice.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
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

export const persistor = persistStore(store);

export default store;
