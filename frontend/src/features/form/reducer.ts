import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
	name: 'form',
	initialState: {},
	reducers: {}
});

export const graphActions = formSlice.actions;

export default formSlice.reducer;
