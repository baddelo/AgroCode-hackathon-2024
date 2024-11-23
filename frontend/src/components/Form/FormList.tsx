import {
	Box,
	FormControl,
	FormHelperText,
	IconButton,
	Input,
	InputLabel,
	Typography
} from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormRegister } from 'react-hook-form/dist/types/form';
import { IForm } from './types.ts';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import DeleteIcon from '@mui/icons-material/Delete';
import { IFishLimit } from '../../types';
import { Controller } from 'react-hook-form';

interface IFormListProps {
  register: UseFormRegister<IForm>;
  control: Control<IForm>;
  index: number;
  errors: FieldErrors<IForm> | undefined;
  onDelete: (index: number) => void;
  fishLimit: IFishLimit | null;
}

const checkLimit = (
	value: number,
	max: number | undefined,
	min: number | undefined
) => {
	if (max === undefined || min === undefined) {
		return;
	}

	if (value < min || value > max) {
		return `${min} - ${max}`;
	}
};

export const FormList: FC<IFormListProps> = ({
	register,
	control,
	index,
	errors,
	onDelete,
	fishLimit
}) => {
	const currentErrors = errors?.fishes?.[index];

	return (
		<Box
			position="relative"
			minWidth="17rem"
			display="flex"
			flexDirection="column"
			gap="15px"
			padding="2rem"
			borderRadius="10px"
			bgcolor="white"
			boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
		>
			{
				index > 0 && (
					<IconButton
						sx={{ width: 'fit-content', position: 'absolute', top: '5px', right: '5px' }}
						onClick={() => {
							if (!index) return;
							onDelete(index);
						}}
					>
						<DeleteIcon />
					</IconButton>
				)
			}
			<Typography sx={{ textAlign: 'center' }} variant='h5'>Рыба №{index + 1}</Typography>
			<FormControl>
				<InputLabel>Идентификатор</InputLabel>
				<Input
					type="number"
					{...register(`fishes.${index}.id`)}
					error={Boolean(currentErrors?.id?.type)}
				/>
			</FormControl>

			<FormControl>
				<InputLabel>Вес</InputLabel>

				<Controller
					name={`fishes.${index}.weight`}
					control={control}
					render={({ field }) => (
						<Input
							type="number"
							value={field.value}
							onChange={field.onChange}
							inputRef={field.ref}
							error={Boolean(currentErrors?.weight?.type)}
						/>
					)}
					rules={
            {
            	validate: {
            		checkLim: (value) =>
            			checkLimit(
            				value,
            				fishLimit?.weight.max,
            				fishLimit?.weight.min
            			)
            	}
            } as any
					}
				/>

				<FormHelperText sx={{ color: 'red' }}>
					{currentErrors?.weight?.message}
				</FormHelperText>
			</FormControl>

			<FormControl>
				<InputLabel>Длина</InputLabel>

				<Controller
					name={`fishes.${index}.length`}
					control={control}
					render={({ field }) => (
						<Input
							type="number"
							value={field.value}
							onChange={field.onChange}
							inputRef={field.ref}
							error={Boolean(currentErrors?.length?.type)}
						/>
					)}
					rules={
            {
            	validate: {
            		checkLim: (value) =>
            			checkLimit(
            				value,
            				fishLimit?.length.max,
            				fishLimit?.length.min
            			)
            	}
            } as any
					}
				/>

				<FormHelperText sx={{ color: 'red' }}>
					{currentErrors?.length?.message}
				</FormHelperText>
			</FormControl>

			<FormControl>
				<InputLabel>Высота</InputLabel>

				<Controller
					name={`fishes.${index}.height`}
					control={control}
					render={({ field }) => (
						<Input
							type="number"
							value={field.value}
							onChange={field.onChange}
							inputRef={field.ref}
							error={Boolean(currentErrors?.height?.type)}
						/>
					)}
					rules={
            {
            	validate: {
            		checkLim: (value) =>
            			checkLimit(
            				value,
            				fishLimit?.height.max,
            				fishLimit?.height.min
            			)
            	}
            } as any
					}
				/>

				<FormHelperText sx={{ color: 'red' }}>
					{currentErrors?.height?.message}
				</FormHelperText>
			</FormControl>

			<FormControl>
				<InputLabel>Толщина</InputLabel>

				<Controller
					name={`fishes.${index}.thickness`}
					control={control}
					render={({ field }) => (
						<Input
							type="number"
							value={field.value}
							onChange={field.onChange}
							inputRef={field.ref}
							error={Boolean(currentErrors?.thickness?.type)}
						/>
					)}
					rules={
            {
            	validate: {
            		checkLim: (value) =>
            			checkLimit(
            				value,
            				fishLimit?.thickness.max,
            				fishLimit?.thickness.min
            			)
            	}
            } as any
					}
				/>

				<FormHelperText sx={{ color: 'red' }}>
					{currentErrors?.thickness?.message}
				</FormHelperText>
			</FormControl>

			<FormControl>
				<InputLabel>Вес икры</InputLabel>

				<Controller
					name={`fishes.${index}.eggs_weight`}
					control={control}
					render={({ field }) => (
						<Input
							type="number"
							value={field.value}
							onChange={field.onChange}
							inputRef={field.ref}
							error={Boolean(currentErrors?.eggs_weight?.type)}
						/>
					)}
					rules={
            {
            	validate: {
            		checkLim: (value) =>
            			checkLimit(
            				value,
            				fishLimit?.eggs_weight.max,
            				fishLimit?.eggs_weight.min
            			)
            	}
            } as any
					}
				/>

				<FormHelperText sx={{ color: 'red' }}>
					{currentErrors?.eggs_weight?.message}
				</FormHelperText>
			</FormControl>

			<FormControl>
				<InputLabel>Вес икринки</InputLabel>

				<Controller
					name={`fishes.${index}.egg_weight`}
					control={control}
					render={({ field }) => (
						<Input
							type="number"
							value={field.value}
							onChange={field.onChange}
							inputRef={field.ref}
							error={Boolean(currentErrors?.egg_weight?.type)}
						/>
					)}
					rules={
            {
            	validate: {
            		checkLim: (value) =>
            			checkLimit(
            				value,
            				fishLimit?.egg_weight.max,
            				fishLimit?.egg_weight.min
            			)
            	}
            } as any
					}
				/>

				<FormHelperText sx={{ color: 'red' }}>
					{currentErrors?.egg_weight?.message}
				</FormHelperText>
			</FormControl>

			{currentErrors && <Typography color="red">Ошибка</Typography>}
		</Box>
	);
};
