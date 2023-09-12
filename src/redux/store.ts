import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { tasksSlice } from './tasks';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { calendarSlice } from './calendar';
import { eventsSlice } from './events';
import { listSlice } from './lists';
import { persistReducer, persistStore } from 'redux-persist';
import { settingsSlice } from './settings';
import { BaseAppDispatch, BaseRootState } from './types';
import createSnackStorage from '../lib/core/redux-storage';
const { deepParseJson } = require('deep-parse-json');

const remindersReducer = (state = [], action) => {
	return state;
};

const userReducer = (state = {}, action) => {
	return state;
};

const rootReducer = combineReducers({
	calendars: calendarSlice.reducer,
	lists: listSlice.reducer,
	events: eventsSlice.reducer,
	reminders: remindersReducer,
	user: userReducer,
	settings: settingsSlice.reducer,
	tasks: tasksSlice.reducer,
});

export const storeConfiguration = {
	// Allow Typescript to infer the types of the store without persistence
	reducer: rootReducer,
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
};

const persistConfig = {
	key: 'root',
	// storage: storage,
	storage: createSnackStorage(),
	// We are storing deeply serialized object in NeDB, JSON.parse will not be sufficient
	// so we pass a custom deserializer that does deep parse
	deserialize: deepParseJson,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	...storeConfiguration,
	reducer: persistedReducer,
});
export type RootState = BaseRootState;
export type AppDispatch = BaseAppDispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
export const persistor = persistStore(store);
