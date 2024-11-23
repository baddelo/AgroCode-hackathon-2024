import { FC, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store';
import { setFishes } from '../../features/table/reducer.ts';

interface ITableProps {}

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', type: 'string', width: 110 },
	{ field: 'weight', headerName: 'Вес', type: 'number', width: 110 },
	{ field: 'length', headerName: 'Длина', type: 'number', width: 110 },
	{
		field: 'height',
		headerName: 'Высота',
		type: 'number',
		width: 110
	},
	{
		field: 'thickness',
		headerName: 'Толщина',
		type: 'number',
		width: 110
	},
	{
		field: 'egg_weight',
		headerName: 'Вес икринки',
		type: 'number',
		width: 110
	},
	{
		field: 'eggs_weight',
		headerName: 'Вес икры',
		type: 'number',
		width: 110
	}
];

const onOnePage = 15;

export const Table: FC<ITableProps> = () => {
	const dispatch = useAppDispatch();

	const fishesStore = useAppSelector((s) => s.table.fishes);

	useEffect(() => {
		axios
			.put('http://87.251.79.100:8080/api/v1/fishes')
			.then(({ data }) => {
				dispatch(setFishes(data));
			})
			.catch(() => {
				toast.error('При получение списка рыб произошла ошибка');
			});
	}, [dispatch]);

	return (
		<Box width="800px">
			<DataGrid
				rows={fishesStore}
				columns={columns}
				hideFooter={true}
				initialState={{
					pagination: {
						paginationModel: {
							page: 0,
							pageSize: onOnePage
						}
					}
				}}
				pageSizeOptions={[5, 10]}
				onPaginationModelChange={(model: GridPaginationModel) => {
					handleClickPagination(model.page);
				}}
			/>
		</Box>
	);
};
