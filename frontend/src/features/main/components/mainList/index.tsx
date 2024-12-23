import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import SetMealIcon from '@mui/icons-material/SetMeal';

function MainList() {
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
			onClick={() => navigate('/list')}
		>
			<SetMealIcon color="primary" sx={{ width: '64px', height: '64px' }} />

			<Typography variant="h6" color="primary">
        Рыбы
			</Typography>
		</Button>
	);
}

export default MainList;
