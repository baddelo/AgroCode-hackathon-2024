import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
function MainGraph() {
	const navigate = useNavigate();

	return (
		<Button
			variant="outlined"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				p: 2,
				textAlign: 'center',
				height: '14rem',
				width: '18rem'
			}}
			onClick={() => navigate('/graph')}
		>
			<AutoGraphIcon color='primary' sx={{ width: '64px', height: '64px' }} />
			<Typography variant="h6" color="primary">Родословные</Typography>
		</Button>
	);
}

export default MainGraph;
