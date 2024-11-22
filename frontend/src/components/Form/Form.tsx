import { SubmitHandler } from 'react-hook-form';
import React from 'react';
import { Box, Button } from '@mui/material';
import { FormList } from './FormList.tsx';
import { IForm } from './types.ts';
import { useMyForm } from './hooks';

export const Form = () => {
	const { register, handleSubmit, errors, fields, append, remove } =
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

		fetch('http://87.251.79.100:8080/api/v1/fishes', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(requestBody)
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('Успех', res);
			})
			.catch((error) => {
				console.log('Ошибка', error);
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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box display="flex" flexDirection="column" gap="15px" padding="16px">
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
							index={index}
							errors={errors}
							onDelete={handleClickRemove}
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
