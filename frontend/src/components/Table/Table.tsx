import { FC, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store';
import { setFishes } from '../../features/table/reducer.ts';
import { useNavigate } from 'react-router-dom';

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
	},

	{
		field: 'mother_id',
		headerName: 'ID самки',
		type: 'string',
		width: 110
	},
	{
		field: 'father_id',
		headerName: 'ID самца',
		type: 'string',
		width: 110
	},
	{
		field: 'k_upit',
		headerName: 'К упитанности',
		type: 'number',
		width: 110
	},
	{
		field: 'i_tolsh',
		headerName: 'И толщины',
		type: 'number',
		width: 110
	},
	{
		field: 'i_visots',
		headerName: 'И высоты',
		type: 'number',
		width: 110
	},
	{
		field: 'dolya_icry',
		headerName: 'Доля икры',
		type: 'number',
		width: 110
	},
	{
		field: 'work_plodovitost',
		headerName: 'Рабочая плодовитость',
		type: 'number',
		width: 110
	},
	{
		field: 'otnosit_plodovitost',
		headerName: 'Относительная плодовитость',
		type: 'number',
		width: 110
	},
	{
		field: 'index_reproduction',
		headerName: 'Индекс репродуктивности',
		type: 'number',
		width: 110
	},
	{
		field: 'breed',
		headerName: 'Порода',
		type: 'number',
		width: 110
	},
	{
		field: 'sex',
		headerName: 'Пол',
		type: 'number',
		width: 110
	},
	{
		field: 'predict_proba',
		headerName: 'Вер. плем. потомства',
		type: 'number',
		width: 180
	}
];

const onOnePage = 15;

export const Table: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const fishesStore = useAppSelector((s) => s.table.fishes);

	useEffect(() => {
		axios
			.get('http://87.251.79.100:8080/api/v1/fishes')
			.then(({ data }) => {
				dispatch(setFishes(data));
			})
			.catch(() => {
				toast.error('При получение списка рыб произошла ошибка');
			});
	}, [dispatch]);

	return (
		<>
			<Box padding="16px 32px" width="100%">
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
				/>
			</Box>
			<Button
				onClick={() => navigate('/download')}
				variant="contained"
				sx={{ mt: 2 }}
			>
        Скачать таблицу
			</Button>
		</>
	);
};
