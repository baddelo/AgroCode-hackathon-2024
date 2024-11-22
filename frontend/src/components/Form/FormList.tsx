import {
	Box,
	FormControl,
	IconButton,
	Input,
	InputLabel,
	Typography
} from '@mui/material';
import React, { FC } from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { IForm } from './types.ts';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import DeleteIcon from '@mui/icons-material/Delete';

interface IFormListProps {
  register: UseFormRegister<IForm>;
  index: number;
  errors: FieldErrors<IForm> | undefined;
  onDelete: (index: number) => void;
}

export const FormList: FC<IFormListProps> = ({
	register,
	index,
	errors,
	onDelete
}) => {
	const currentErrors = errors?.fishes?.[index];

	return (
		<Box minWidth="300px" display="flex" flexDirection="column" gap="15px">
			<IconButton
				sx={{ width: 'fit-content' }}
				onClick={() => {
					if (!index) {
						return;
					}

					onDelete(index);
				}}
			>
				<DeleteIcon />
			</IconButton>

			<FormControl>
				<InputLabel>Идентификатор</InputLabel>
				<Input
					type="number"
					{...register(`fishes.${index}.id`, { required: true })}
					error={Boolean(currentErrors?.id?.type)}
				/>
			</FormControl>

			<FormControl>
				<InputLabel>Вес</InputLabel>
				<Input
					type="number"
					{...register(`fishes.${index}.weight`, { required: true })}
					error={Boolean(currentErrors?.weight?.type)}
				/>
			</FormControl>

			<FormControl>
				<InputLabel>Длина</InputLabel>
				<Input type="number" {...register(`fishes.${index}.length`)} />
			</FormControl>

			<FormControl>
				<InputLabel>Высота</InputLabel>
				<Input type="number" {...register(`fishes.${index}.height`)} />
			</FormControl>

			<FormControl>
				<InputLabel>Толщина</InputLabel>
				<Input type="number" {...register(`fishes.${index}.thickness`)} />
			</FormControl>

			<FormControl>
				<InputLabel>Вес икры</InputLabel>
				<Input type="number" {...register(`fishes.${index}.eggs_weight`)} />
			</FormControl>

			<FormControl>
				<InputLabel>Вес икринки</InputLabel>
				<Input type="number" {...register(`fishes.${index}.egg_weight`)} />
			</FormControl>

			{currentErrors && <Typography color="red">Ошибка</Typography>}
		</Box>
	);
};
