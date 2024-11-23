import { configureStore } from '@reduxjs/toolkit';

import { formReducer } from '../features/form/reducer';
import graphSlice from '../features/graph/reducer';
import { tableReducer } from '../features/table/reducer.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
	reducer: {
		form: formReducer,
		table: tableReducer,
		graph: graphSlice
	}
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
