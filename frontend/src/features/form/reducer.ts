import { createSlice } from '@reduxjs/toolkit';
import { IFormGroup } from '../../types';

const initialState = {
	groupsFish: [] as IFormGroup[],
	optionsGroupsFish: [] as { value: string; text: string }
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
				...payload
			];
		}
	}
});

export const { setGroupsFish, setOptionsGroupsFish } = formSlice.actions;
export const formReducer = formSlice.reducer;
