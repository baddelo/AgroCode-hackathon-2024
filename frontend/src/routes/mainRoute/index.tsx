import { useNavigate } from 'react-router-dom';

import { Box, Button, ButtonGroup } from '@mui/material';

import MainBlock from '../../features/main/components/mainBlock';

function MainRoute() {
	const navigate = useNavigate();

	return (
		<Box display='flex' flexDirection='column' alignItems='center' gap={2}>
			<MainBlock />
			<ButtonGroup>
				<Button onClick={() => navigate('/form')}>Form</Button>
				<Button onClick={() => navigate('/graph')}>Graph</Button>
			</ButtonGroup>
		</Box>
	);
}

export default MainRoute;
