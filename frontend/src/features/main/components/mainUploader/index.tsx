import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function MainUploader() {
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
			onClick={() => navigate('/uploader')}
		>
			<UploadFileIcon color='primary' sx={{ width: '64px', height: '64px' }} />
			<Typography variant="h6" color="primary">Загрузить файл</Typography>
		</Button>
	);
}

export default MainUploader;