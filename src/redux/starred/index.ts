import { createSlice } from '@reduxjs/toolkit';
import { AppEntity, Starred } from './types';
import { RootState } from '../store';

const initialState: { items: Array<Starred> } = {
	items: [],
};

export const starredSlice = createSlice({
	name: 'starred',
	initialState,
	reducers: {
		addToStarred: (state, action) => {
			const { id, entity } = action.payload;
			state.items.push({
				id,
				entity,
				createdAt: new Date(),
				idx: state.items.length,
			});
		},
		removeStarred: (state, action) => {
			const { id } = action.payload;

			state.items = state.items.filter((item) => item.id !== id);
			state.items = state.items.map((starred, idx) => ({ ...starred, idx }));
		},
		changeOrder: (state, action) => {
			const { idx, id } = action.payload;

			state.items.map((item) => {
				if (item.id === id) item.idx = idx;
				return item;
			});
		},
	},
});

export const { addToStarred, removeStarred } = starredSlice.actions;

export default starredSlice.reducer;

export const selectStarredItems = (state: any) => {
	let items = [...state.starred.items];
	return items.sort((a, b) => a.idx - b.idx);
};
export const selectStarredItemById = (id: string) => (state: RootState) => {
	const item = state.starred.items.find((item) => item.id === id);
	if (!item) return null;

	if (item.entity === AppEntity.Project)
		return { ...item, meta: state.lists.items.find((list) => list.id === id) };
	if (item.entity === AppEntity.Task)
		return {
			...item,
			meta: {
				...state.tasks.items.find((task) => task.id === id),
				name: state.tasks.items.find((task) => task.id === id)?.title,
			},
		};
};
