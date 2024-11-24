import { Box } from '@mui/material';
import Tree from '../../features/tree';

function GraphPage() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems='center'
			width="90%"
		>
			<Tree />
		</Box>
	);
}

export default GraphPage;
