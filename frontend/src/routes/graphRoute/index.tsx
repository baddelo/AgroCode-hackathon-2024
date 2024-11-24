import { Box, Button } from '@mui/material';
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
			<Button
				href="http://87.251.79.100:8080/api/v1/excel/download/generations"
				variant="contained"
				color="primary"
				sx={{ marginTop: 2 }}
			>
				Скачать файл c родословной
			</Button>
		</Box>
	);
}

export default GraphPage;
