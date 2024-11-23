import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import PhishingIcon from '@mui/icons-material/Phishing';

function MainGroup() {
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
			onClick={() => navigate('/group')}
		>
			<PhishingIcon color='primary' sx={{ width: '64px', height: '64px' }} />
			<Typography variant="h6" color="primary">Добавить группу</Typography>
		</Button>
	);
}

export default MainGroup;