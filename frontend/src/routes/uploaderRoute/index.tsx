import { Box, Button } from '@mui/material';

import Uploader from '../../features/uploader';

function UploaderRoute() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			gap="1rem"
			width="100%"
		>
			<Button
				href="https://docs.google.com/spreadsheets/d/158KvyqJuQXDAvS5OuwU8dwJTAXOMWhN-5IiqB60Tn5w/edit?usp=sharing"
				variant="contained"
				color="primary"
			>
        Шаблон
			</Button>

			<Uploader />
		</Box>
	);
}

export default UploaderRoute;
