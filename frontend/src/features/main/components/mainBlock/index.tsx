import { Box } from '@mui/material';

import MainGroup from '../mainGroup';
import MainUploader from '../mainUploader';

function MainBlock() {
	return (
		<Box
			display='flex'
			flexDirection='row'
			justifyContent='center'
			flexWrap='wrap'
			gap='1rem'
		>
			<MainGroup />
			<MainUploader />
		</Box>
	);
}

export default MainBlock;