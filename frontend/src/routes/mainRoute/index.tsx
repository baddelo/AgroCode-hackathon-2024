import { useNavigate } from 'react-router-dom';

import { Box, Button, ButtonGroup } from '@mui/material';

function MainRoute() {
	const navigate = useNavigate();

	return (
		<Box display='flex' flexDirection='column' alignItems='center' gap={2}>
			<h1>Main Route</h1>
			<ButtonGroup>
				<Button onClick={() => navigate('/form')}>Form</Button>
				<Button onClick={() => navigate('/graph')}>Graph</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button onClick={() => navigate('/test/form')}>Test Form</Button>
				<Button onClick={() => navigate('/test/graph')}>Test Graph</Button>
			</ButtonGroup>
		</Box>
	);
}

export default MainRoute;
