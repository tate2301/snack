import { createSlice } from '@reduxjs/toolkit';

export const inboxStore = createSlice({
	initialState: [],
	name: 'inbox',
	reducers: {
		addItem: (state, action) => {
			return state;
		},
	},
});
