import React, { useCallback, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface FileItem {
  file: File;
}

const Uploader: React.FC = () => {
	const [files, setFiles] = useState<FileItem[]>([]);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const excelFiles = acceptedFiles.filter((file) =>
			file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
		);

		const newFiles = excelFiles.map((file) => ({ file }));
		setFiles((prev) => [...prev, ...newFiles]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
			'application/vnd.ms-excel': ['.xls']
		}
	});

	const handleRemoveFile = (e, index: number) => {
		e.stopPropagation();

		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<Box
			sx={{
				p: 3,
				border: '2px dashed #ccc',
				borderRadius: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				height: 200,
				width: '60%',
				cursor: 'pointer'
			}}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			{files.length === 0 && (
				<Typography variant="h6" color="textSecondary">
          Перетащите файлы сюда или нажмите для выбора
				</Typography>
			)}

			{files.length > 0 && (
				<Box sx={{ mt: 2 }}>
					<Typography variant="subtitle1">Загруженные файлы:</Typography>
					{files.map((item, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: 1,
								p: 1,
								border: '1px solid #ccc',
								borderRadius: 1,
								backgroundColor: '#f9f9f9',
								width: '100%'
							}}
						>
							<Typography variant="body2">{item.file.name}</Typography>
							<Button
								variant="outlined"
								color="error"
								size="small"
								onClick={(e) => handleRemoveFile(e, index)}
							>
                Удалить
							</Button>
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
};

export default Uploader;
