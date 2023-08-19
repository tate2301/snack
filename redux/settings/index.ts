import { createSlice } from '@reduxjs/toolkit';
import { SnackApplicationSettings, SnackBuild } from './types';

const initialState: SnackApplicationSettings = {
	build: SnackBuild.DEV,
	lastOpened: new Date(),
	onboarded: false,
	version: '0.0.1',
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		updateSettings: (state, action) => {
			const { onboarded, lastOpened, version, build } = action.payload;
			state.onboarded = onboarded;
			state.lastOpened = lastOpened;
			state.version = version;
			state.build = build;
		},
	},
});

export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;

export const applicationSettings = (state: any) => state.settings;
