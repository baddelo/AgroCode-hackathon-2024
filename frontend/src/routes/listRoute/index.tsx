import { Box, Button, Typography } from '@mui/material';
import { Table } from '../../components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	selectGroupsFish,
	setGroupsFish,
	setOptionsGroupsFish
} from '../../features/form/reducer.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { GridColDef } from '@mui/x-data-grid';
import { IFishes } from '../../types';
import { columnsFishes } from '../graphRoute';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'Номер группы', type: 'number', width: 200 },
	{ field: 'breed', headerName: 'Вид', type: 'string', width: 110 },
	{
		field: 'father_group',
		headerName: 'Группа папы',
		type: 'number',
		width: 110
	},
	{
		field: 'mother_group',
		headerName: 'Группа мамы',
		type: 'number',
		width: 110
	},
	{ field: 'sex', headerName: 'Пол', type: 'number', width: 110 }
];

function ListRoute() {
	const dispatch = useAppDispatch();
	const optionsGroupsFish = useAppSelector(selectGroupsFish);
	const [group, setGroup] = useState<IFishes | null>(null);
	const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get('http://87.251.79.100:8080/api/v1/groups')
			.then(({ data }) => {
				dispatch(setOptionsGroupsFish(data));
				dispatch(setGroupsFish(data));
			})
			.catch(() => {
				toast.error('При получение списка групп произошла ошибка');
			});
	}, [dispatch]);

	const handleClickCell = (e: any) => {
		axios
			.get('http://87.251.79.100:8080/api/v1/fishes', {
				params: {
					group_id: e.id
				}
			})
			.then(({ data }) => {
				setSelectedGroupId(e.id);
				setGroup(data);
			})
			.catch(() => {
				toast.error('При получение списка рыб по группе произошла ошибка');
			});
	};

	const handleDownload = () => {
		if (!group || group === 'not') {
			toast.error('Выберите группу для скачивания файла');
			return;
		}

		axios
			.get('http://87.251.79.100:8080/api/v1/excel/download/by-group', {
				params: { group_id: selectedGroupId },
				responseType: 'blob'
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `group_${selectedGroupId}.xlsx`);
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
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			p="32px"
			width="100%"
		>
			<Typography variant="h3">Список групп</Typography>

			<Table
				rows={optionsGroupsFish || []}
				columns={columns}
				onCellClick={handleClickCell}
			/>

			{group && (
				<Box width="90%" mt="30px">
					<Typography variant="h4">
            Список рыб для группы {selectedGroupId}
					</Typography>

					<Table rows={group} columns={columnsFishes} />

					<Button onClick={handleDownload} variant="contained" sx={{ mt: 2 }}>
            Скачать таблицу
					</Button>
				</Box>
			)}
		</Box>
	);
}

export default ListRoute;
