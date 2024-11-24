import { FC, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppDispatch } from '../../store';
import { setFishes } from '../../features/table/reducer.ts';
import { useNavigate } from 'react-router-dom';

const onOnePage = 30;

interface ITable {
  rows: any;
  columns: GridColDef[];
}

export const Table: FC<ITable> = ({ rows, columns }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

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
			<Box padding="16px 32px">
				<DataGrid
					rows={rows}
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
