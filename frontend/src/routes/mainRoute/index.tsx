import { Box } from '@mui/material';

import MainBlock from '../../features/main/components/mainBlock';

function MainRoute() {
	return (
		<Box display='flex' flexDirection='column' alignItems='center' gap={2}>
			<MainBlock />
		</Box>
	);
}

export default MainRoute;
