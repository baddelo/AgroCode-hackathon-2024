import { Outlet, useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

function MainLayout() {
	const navigate = useNavigate();

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'start',
						alignItems: 'center',
						gap: 1,
						userSelect: 'none',
						padding: '1rem'
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							gap: 1,
							userSelect: 'none',
							cursor: 'pointer'
						}}
						onClick={() => navigate('/')}
					>
						<img
							width={64}
							height={64}
							src='/logo.svg'
							alt='logo'
						/>
						<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
							FISH HUNTER
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						flex: 1
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</>
	);
}

export default MainLayout;
