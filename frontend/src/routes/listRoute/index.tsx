import { Box, Typography } from '@mui/material';
import { Table } from '../../components';
import { useEffect } from 'react';
import axios from 'axios';
import {
	selectGroupsFish,
	setGroupsFish,
	setOptionsGroupsFish
} from '../../features/form/reducer.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { GridColDef } from '@mui/x-data-grid';

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

	return (
		<Box display="flex" flexDirection="column" alignItems="center" p="32px">
			<Typography variant="h3">Список групп</Typography>

			<Table rows={optionsGroupsFish} columns={columns} />
		</Box>
	);
}

export default ListRoute;
