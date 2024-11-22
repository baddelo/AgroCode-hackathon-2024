import { configureStore } from '@reduxjs/toolkit';

import formSlice from '../features/form/reducer';
import graphSlice from '../features/graph/reducer';


const store = configureStore({
	reducer: {
		form: formSlice,
		graph: graphSlice
	}
});

export { store };
