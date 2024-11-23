import { SubmitHandler } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { FormList } from './FormList.tsx';
import { IForm } from './types.ts';
import { useMyForm } from './hooks';
import { IFishLimit } from '../../types';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Form = () => {
	const [fishLimit, setFishLimit] = useState<IFishLimit>(null);

	const { register, control, handleSubmit, errors, fields, append, remove } =
    useMyForm();

	const onSubmit: SubmitHandler<IForm> = ({ fishes }) => {
		const requestBody = fishes.map((fish) => ({
			id: String(fish.id),
			weight: Number(fish.weight),
			length: Number(fish.length),
			height: Number(fish.height),
			thickness: Number(fish.thickness),
			eggs_weight: Number(fish.eggs_weight),
			egg_weight: Number(fish.egg_weight)
		}));

		axios
			.post('http://87.251.79.100:8080/api/v1/fishes', requestBody, {})
			.then((res) => {
				console.log('Успех', res.data);
			})
			.catch(() => {
				toast.error('При отправки произошла ошибка');
			});
	};

	const handleClickAddMore = () => {
		append({
			id: null,
			weight: null,
			length: null,
			height: null,
			thickness: null,
			eggs_weight: null,
			egg_weight: null
		});
	};

	const handleClickRemove = (index: number) => {
		remove(index);
	};

	useEffect(() => {
		axios
			.get('http://87.251.79.100:8080/api/v1/fishes/parameters-limits')
			.then((res) => {
				setFishLimit(res.data);
			})
			.catch(() => {
				toast.error('При получение лимитов произошла ошибка');
			});
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box display="flex" flexDirection="column" gap="15px">
				<Box
					display="flex"
					gap="15px"
					padding="16px 0"
					sx={{
						overflowX: 'auto'
					}}
				>
					{fields.map((field, index) => (
						<FormList
							key={field.id}
							register={register}
							control={control}
							index={index}
							errors={errors}
							onDelete={handleClickRemove}
							fishLimit={fishLimit}
						/>
					))}
				</Box>

				<Box display="flex" gap="10px">
					<Button type="submit">Отправить</Button>
					<Button onClick={handleClickAddMore}>Добавить еще</Button>
				</Box>
			</Box>
		</form>
	);
};
