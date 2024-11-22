import { Form, Table } from '../../components';
import { Box } from '@mui/material';

function FormPage() {
	return (
		<Box display="flex" flexDirection="column" gap="50px">
			<Form />
			<Table />
		</Box>
	);
}

export default FormPage;
