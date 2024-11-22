import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MainLayout() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<>
			{
				pathname !== '/' &&
					<Button
						sx={{ position: 'absolute', top: '10px', left: '10px' }}
						onClick={() => navigate(-1)}
					>
						<ArrowBackIcon />
					</Button>
			}
			<div>
				<Outlet />
			</div>
		</>
	);
}

export default MainLayout;
