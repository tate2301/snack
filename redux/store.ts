import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const store = configureStore({
	reducer: {},
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
