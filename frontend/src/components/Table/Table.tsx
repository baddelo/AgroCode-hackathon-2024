import { FC, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppDispatch } from '../../store';
import { setFishes } from '../../features/table/reducer.ts';

const onOnePage = 30;

interface ITable {
  rows: any;
  columns: GridColDef[];
  onCellClick?: (e: any) => void;
}

export const Table: FC<ITable> = ({ rows, columns, onCellClick }) => {
	const dispatch = useAppDispatch();

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
			<Box>
				<DataGrid
					rows={rows}
					columns={columns}
					hideFooter={true}
					onCellClick={onCellClick}
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
		</>
	);
};
