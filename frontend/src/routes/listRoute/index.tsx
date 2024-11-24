import { Box } from '@mui/material';
import { Table } from '../../components';

function ListRoute() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			p='32px'
		>
			<Table />
		</Box>
	);
}

export default ListRoute;
