import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/mainLayout';

import MainRoute from './routes/mainRoute';
import FormRoute from './routes/formRoute';
import GraphRoute from './routes/graphRoute';
import TestFormRoute from './routes/testRoutes/testFormRoute';
import TestGraphRoute from './routes/testRoutes/testGraphRoute';

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<MainRoute />} />
				<Route path="/form" element={<FormRoute />} />
				<Route path="/graph" element={<GraphRoute />} />
				<Route path="/test/form" element={<TestFormRoute />} />
				<Route path="/test/graph" element={<TestGraphRoute />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}

export default App;
