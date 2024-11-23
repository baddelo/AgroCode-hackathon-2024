import { Box } from '@mui/material';

import Uploader from '../../features/uploader';

function UploaderRoute() {
	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			gap='1rem'
			width='100%'
		>
			<Uploader />
		</Box>
	);
}

export default UploaderRoute;
