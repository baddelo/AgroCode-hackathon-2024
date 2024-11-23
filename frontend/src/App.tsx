import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/mainLayout';

import MainRoute from './routes/mainRoute';
import FormRoute from './routes/formRoute';
import GraphRoute from './routes/graphRoute';
import TestFormRoute from './routes/testRoutes/testFormRoute';
import TestGraphRoute from './routes/testRoutes/testGraphRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
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

			<ToastContainer />
		</>
	);
}

export default App;
