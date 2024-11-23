import { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';
import { toast } from 'react-toastify';
import { IFishes } from '../../types';
import axios from 'axios';

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

// const rows = [
// 	{
// 		id: 1,
// 		weight: 1,
// 		length: 1,
// 		height: 1,
// 		thickness: 1,
// 		weightEggs: 1,
// 		сalfWeight: 1
// 	},
// 	{
// 		id: 2,
// 		weight: 260,
// 		length: 238,
// 		height: 262,
// 		thickness: 89,
// 		weightEggs: 419,
// 		сalfWeight: 326
// 	},
// 	{
// 		id: 3,
// 		weight: 322,
// 		length: 199,
// 		height: 363,
// 		thickness: 290,
// 		weightEggs: 278,
// 		сalfWeight: 422
// 	},
// 	{
// 		id: 4,
// 		weight: 348,
// 		length: 250,
// 		height: 269,
// 		thickness: 205,
// 		weightEggs: 110,
// 		сalfWeight: 155
// 	},
// 	{
// 		id: 5,
// 		weight: 348,
// 		length: 250,
// 		height: 269,
// 		thickness: 205,
// 		weightEggs: 110,
// 		сalfWeight: 155
// 	},
// 	{
// 		id: 6,
// 		weight: 348,
// 		length: 250,
// 		height: 269,
// 		thickness: 205,
// 		weightEggs: 110,
// 		сalfWeight: 155
// 	},
// 	{
// 		id: 7,
// 		weight: 348,
// 		length: 250,
// 		height: 269,
// 		thickness: 205,
// 		weightEggs: 110,
// 		сalfWeight: 155
// 	},
// 	{
// 		id: 8,
// 		weight: 348,
// 		length: 250,
// 		height: 269,
// 		thickness: 205,
// 		weightEggs: 110,
// 		сalfWeight: 155
// 	},
// 	{
// 		id: 9,
// 		weight: 348,
// 		length: 250,
// 		height: 269,
// 		thickness: 205,
// 		weightEggs: 110,
// 		сalfWeight: 155
// 	},
// 	{
// 		id: 10,
// 		weight: 348,
// 		length: 250,
// 		height: 269,
// 		thickness: 205,
// 		weightEggs: 110,
// 		сalfWeight: 155
// 	}
// ];

const onOnePage = 15;

export const Table: FC<ITableProps> = () => {
	const [fishes, setFishes] = useState<IFishes[]>([]);
	// const pageSize = useMemo(() => Math.ceil(rows.length / onOnePage), []);

	const handleClickPagination = (page: number) => {};

	useEffect(() => {
		axios
			.put('http://87.251.79.100:8080/api/v1/fishes')
			.then((res) => {
				setFishes(res.data);
			})
			.catch(() => {
				toast.error('При получение списка рыб произошла ошибка');
			});
	}, []);

	console.log('fishes', fishes);

	return (
		<Box width="800px">
			<DataGrid
				rows={fishes}
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
