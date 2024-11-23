import { createSlice } from '@reduxjs/toolkit';
import { IFishes } from '../../types';

const initialState = {
	fishes: [] as IFishes[]
};

const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setFishes: (state, { payload }) => {
			state.fishes = payload;
		}
	}
});

export const { setFishes } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
