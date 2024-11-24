import 'react-toastify/dist/ReactToastify.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainLayout from './layouts/mainLayout';

import MainRoute from './routes/mainRoute';
import FormRoute from './routes/formRoute';
import GraphRoute from './routes/graphRoute';
import GroupRoute from './routes/groupRoute';
import UploaderRoute from './routes/uploaderRoute';
import GroupDownloadRoute from './routes/groupDownloadRoute';
import ListRoute from './routes/listRoute';

function App() {
	return (
		<>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<MainRoute />} />
					<Route path="/form" element={<FormRoute />} />
					<Route path="/graph" element={<GraphRoute />} />
					<Route path="/group" element={<GroupRoute />} />
					<Route path="/uploader" element={<UploaderRoute />} />
					<Route path="/download" element={<GroupDownloadRoute />} />
					<Route path="/list" element={<ListRoute />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>

			<ToastContainer />
		</>
	);
}

export default App;
