import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store';
import {
	setGroupsFish,
	setOptionsGroupsFish,
	selectOptionsGroupsFish
} from '../../features/form/reducer.ts';
import { toast } from 'react-toastify';
import {
	Box,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button
} from '@mui/material';

function Download() {
	const dispatch = useAppDispatch();
	const optionsGroupsFish = useAppSelector(selectOptionsGroupsFish);
	const [selectedGroup, setSelectedGroup] = useState('');

	useEffect(() => {
		axios
			.get('http://87.251.79.100:8080/api/v1/groups')
			.then(({ data }) => {
				dispatch(
					setOptionsGroupsFish(
						data
							.filter((item) => typeof item.id === 'string')
							.map((item) => ({
								value: item.id,
								text: item.id
							}))
					)
				);
				dispatch(setGroupsFish(data));
			})
			.catch(() => {
				toast.error('При получение списка групп произошла ошибка');
			});
	}, [dispatch]);

	const handleGroupChange = (event) => {
		setSelectedGroup(event.target.value);
	};

	const handleDownload = () => {
		if (!selectedGroup || selectedGroup === 'not') {
			toast.error('Выберите группу для скачивания файла');
			return;
		}

		axios
			.get('http://87.251.79.100:8080/api/v1/excel/download/by-group', {
				params: { group_id: selectedGroup },
				responseType: 'blob'
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `group_${selectedGroup}.xls`);
				document.body.appendChild(link);
				link.click();
				link.remove();
				toast.success('Файл успешно скачан');
			})
			.catch(() => {
				toast.error('Ошибка при скачивании файла');
			});
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
			<Typography variant="h5" gutterBottom>
				Выберите группу для скачивания файла
			</Typography>
			<FormControl fullWidth sx={{ mb: 3 }}>
				<InputLabel id="group-select-label">Группа</InputLabel>
				<Select
					labelId="group-select-label"
					value={selectedGroup}
					onChange={handleGroupChange}
					label="Группа"
				>
					{optionsGroupsFish.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.text}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'space-between' }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleDownload}
					disabled={!selectedGroup || selectedGroup === 'not'}
				>
					Скачать файл
				</Button>
				<Button
					href="http://87.251.79.100:8080/api/v1/excel/download/generations"
					variant="contained"
					color="primary"
				>
					Скачать файл поколений
				</Button>
			</Box>
		</Box>
	);
}

export default Download;
