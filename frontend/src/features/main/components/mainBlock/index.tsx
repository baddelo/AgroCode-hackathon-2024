import { Box } from '@mui/material';
import MainUploader from '../mainUploader';
import MainForm from '../mainForm';
import MainGraph from '../mainGraph';
import MainList from '../mainList';

function MainBlock() {
	return (
		<Box
			display="flex"
			flexDirection="row"
			justifyContent="center"
			flexWrap="wrap"
			gap="1rem"
		>
			<MainForm />
			<MainList />
			<MainGraph />
			<MainUploader />
		</Box>
	);
}

export default MainBlock;
