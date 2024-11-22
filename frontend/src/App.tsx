import { Routes, Route } from 'react-router-dom';

import FormPage from './routes/formPage';
import GraphPage from './routes/graphPage';

function App() {
	return (
		<Routes>
			<Route path="/" element={<FormPage />} />
			<Route path="/graphs" element={<GraphPage />} />
		</Routes>
	);
}

export default App;
