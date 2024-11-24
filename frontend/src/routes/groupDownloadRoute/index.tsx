import { Box } from '@mui/material';
import Download from '../../features/download';

function GroupDownloadPage() {
	return (
		<Box display="flex" flexDirection="column" justifyContent='center' alignItems="center" gap="50px" padding="16px">
			<Download />
		</Box>
	);
}

export default GroupDownloadPage;
