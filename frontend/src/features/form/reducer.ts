import { createSlice } from '@reduxjs/toolkit';
import { IFormGroup } from '../../types';

const initialState = {
	groupsFish: [] as IFormGroup[],
	optionsGroupsFish: [] as { value: string; text: string }[]
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setGroupsFish: (state, { payload }) => {
			state.groupsFish = payload;
		},

		setOptionsGroupsFish: (state, { payload }) => {
			state.optionsGroupsFish = [
				{ value: 'not', text: 'Не выбран' },
				...payload,
			];
		},
	},
});

export const { setGroupsFish, setOptionsGroupsFish } = formSlice.actions;

export const selectGroupsFish = (state: { form: typeof initialState }) =>
	state.form.groupsFish;

export const selectOptionsGroupsFish = (state: { form: typeof initialState }) =>
	state.form.optionsGroupsFish;

export const formReducer = formSlice.reducer;
