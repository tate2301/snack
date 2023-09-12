import { configureStore } from '@reduxjs/toolkit';
import { storeConfiguration } from './store';

const store = configureStore(storeConfiguration);

export type BaseRootState = ReturnType<typeof store.getState>;
export type BaseAppDispatch = typeof store.dispatch;
