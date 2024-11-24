import { Box } from '@mui/material';

import MainGroup from '../mainGroup';
import MainUploader from '../mainUploader';
import MainForm from '../mainForm';
import MainGraph from '../mainGraph';

function MainBlock() {
	return (
		<>
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
			<Box
				display='flex'
				flexDirection='row'
				justifyContent='center'
				flexWrap='wrap'
				gap='1rem'
			>
				<MainForm />
				<MainGraph />
			</Box>
		</>
	);
}

export default MainBlock;