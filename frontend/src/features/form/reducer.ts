import { createSlice } from '@reduxjs/toolkit';
import { IFormGroup } from '../../types';

const initialState = {
	groupsFish: [] as IFormGroup[],
	optionsGroupsFish: [] as { value: string; text: string }[],
	optionsFatherGroups: [] as { value: string; text: string }[],
	optionsMotherGroups: [] as { value: string; text: string }[]
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setGroupsFish: (state, { payload }) => {
			state.groupsFish = payload;
		},

		setOptionsGroupsFish: (state, { payload }) => {
			const groups = payload.filter((item) => typeof item.id === 'string');
			const father = groups
				.filter((item) => item.sex === 'М')
				.map((item) => ({
					value: item.id,
					text: item.id
				}));
			const mother = groups
				.filter((item) => item.sex === 'Ж')
				.map((item) => ({
					value: item.id,
					text: item.id
				}));

			state.groupsFish = groups;

			state.optionsFatherGroups = [
				{ value: 'not', text: 'Не выбран' },
				...father
			];
			state.optionsMotherGroups = [
				{ value: 'not', text: 'Не выбран' },
				...mother
			];

			state.optionsGroupsFish = [
				{ value: 'not', text: 'Не выбран' },
				...payload.map((item) => ({
					value: item.id,
					text: item.id
				}))
			];
		}
	}
});

export const { setGroupsFish, setOptionsGroupsFish } = formSlice.actions;

export const selectGroupsFish = (state: { form: typeof initialState }) =>
	state.form.groupsFish;

export const selectOptionsGroupsFish = (state: { form: typeof initialState }) =>
	state.form.optionsGroupsFish;

export const formReducer = formSlice.reducer;
