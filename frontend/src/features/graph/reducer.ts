import { createSlice } from '@reduxjs/toolkit';

const graphSlice = createSlice({
	name: 'graph',
	initialState: {},
	reducers: {}
});

export const graphActions = graphSlice.actions;

export default graphSlice.reducer;
