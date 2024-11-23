import { Box } from '@mui/material';
import { Table } from '../../components';
// import Tree from '../../features/tree';

function GraphPage() {
	return (
		<Box display="flex" flexDirection="column" alignItems="center" p='32px'>
			<Table />
			{/* <Tree /> */}
		</Box>
	);
}

export default GraphPage;
