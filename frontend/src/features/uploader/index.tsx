import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import { Box, Typography, Button } from '@mui/material';

interface FileItem {
  file: File;
}

const Uploader: React.FC = () => {
	const [files, setFiles] = useState<FileItem[]>([]);
	const [isUploading, setIsUploading] = useState(false);

	const navigate = useNavigate();

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const excelFiles = acceptedFiles.filter((file) =>
			file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
		);

		const newFiles = excelFiles.map((file) => ({ file }));
		setFiles((prev) => [...prev, ...newFiles]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
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

	const handleUploadFiles = async () => {
		if (files.length === 0) return;

		setIsUploading(true);

		try {
			for (const { file } of files) {
				const formData = new FormData();
				formData.append('file', file, file.name);

				await axios.post('http://87.251.79.100:8080/api/v1/excel/upload',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							accept: 'application/json'
						}
					}
				);
			}

			alert('Все файлы успешно загружены!');
			navigate('/graph');
			setFiles([]);
		} catch (error) {
			console.error('Ошибка при загрузке файлов:', error);
			alert('Произошла ошибка при загрузке');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<>
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
			<Button
				variant="contained"
				color="primary"
				onClick={handleUploadFiles}
				disabled={isUploading || files.length === 0}
			>
				{isUploading ? 'Загрузка...' : 'Загрузить'}
			</Button>
		</>
	);
};

export default Uploader;
