import { Box, Button } from '@mui/material';
import { Table } from '../../components';
import { useAppSelector } from '../../store';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

// import Tree from '../../features/tree';

export const columnsFishes: GridColDef[] = [
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

function GraphPage() {
	const fishesStore = useAppSelector((s) => s.table.fishes);
	const navigate = useNavigate();

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			p="32px"
			width="100%"
		>
			<Box width="90%">
				<Table rows={fishesStore || []} columns={columnsFishes} />

				<Button
					onClick={() => navigate('/download')}
					variant="contained"
					sx={{ mt: 2 }}
				>
          Скачать таблицу
				</Button>
			</Box>
			{/* <Tree /> */}
		</Box>
	);
}

export default GraphPage;
