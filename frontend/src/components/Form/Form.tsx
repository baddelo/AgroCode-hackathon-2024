import { SubmitHandler } from 'react-hook-form';
import React, { useEffect, useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { FormList } from './FormList.tsx';
import { IForm } from './types.ts';
import { useMyForm } from './hooks';
import { IFishLimit } from '../../types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppDispatch } from '../../store';
import { setFishes } from '../../features/table/reducer.ts';

export const Form = () => {
	const [fishLimit, setFishLimit] = useState<IFishLimit | null>(null);

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const dispatch = useAppDispatch();

	const {
		register,
		control,
		handleSubmit,
		errors,
		fields,
		append,
		remove,
		form
	} = useMyForm();

	const onSubmit: SubmitHandler<IForm> = async ({ fishes }) => {
		const requestBody = fishes.map((fish) => ({
			id: fish.id || null,
			weight: Number(fish.weight),
			length: Number(fish.length),
			height: Number(fish.height),
			thickness: Number(fish.thickness),
			eggs_weight: Number(fish.eggs_weight),
			egg_weight: Number(fish.egg_weight)
		}));

		try {
			const { data } = await axios.post(
				'http://87.251.79.100:8080/api/v1/fishes',
				requestBody
			);

			dispatch(setFishes(data));
			form.reset();

			toast.success('Успешно отправлено');
		} catch {
			toast.error('При отправки произошла ошибка');
		}
	};

	const onError = () => {
		const formValues = form.getValues();
		onSubmit(formValues);
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

		setTimeout(() => {
			const container = scrollContainerRef.current;
			if (container) {
				container.scrollTo({
					left: container.scrollWidth,
					behavior: 'smooth'
				});
			}
		}, 0);
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
		<form onSubmit={handleSubmit(onSubmit, onError)}>
			<Box display="flex" flexDirection="column" alignItems="center" gap="15px">
				<Box
					display="flex"
					flexDirection="row"
					gap="25px"
					padding="16px 10px"
					width='100%'
					alignItems="center"
					boxSizing="border-box"
					ref={scrollContainerRef}
					sx={{
						overflowX: 'auto',
						whiteSpace: 'nowrap',
						scrollBehavior: 'smooth',
						justifyContent: fields.length > 2 ? 'start' : 'center'
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
					<Button variant='contained' onClick={handleClickAddMore}>Добавить</Button>
					<Button variant='contained' type="submit">Отправить</Button>
				</Box>
			</Box>
		</form>
	);
};
