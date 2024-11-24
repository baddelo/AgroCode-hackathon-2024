import React, { FC, useEffect } from 'react';
import {
	Box,
	Button,
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	Select,
	Typography
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IFormGroup } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store';
import {
	setGroupsFish,
	setOptionsGroupsFish
} from '../../features/form/reducer.ts';
import axios from 'axios';

interface IFormGroupProps {}

export const FormGroup: FC<IFormGroupProps> = () => {
	const { control, register, handleSubmit, formState, ...form } =
    useForm<IFormGroup>({
    	defaultValues: {
    		id: null,
    		breed: 'Лосось',
    		sex: 'М',
    		father_group: 'not',
    		mother_group: 'not'
    	}
    });

	const dispatch = useAppDispatch();
	const optionsGroupsFish = useAppSelector(
		(store) => store.form.optionsGroupsFish
	);

	const getGroupsFish = () => {
		return axios
			.get('http://87.251.79.100:8080/api/v1/groups')
			.then(({ data }) => {
				dispatch(
					setOptionsGroupsFish(
						data
							.filter((item) => typeof item.id === 'string')
							.map((item) => ({
								value: item.id,
								text: item.id
							}))
					)
				);

				dispatch(setGroupsFish(data));
			})
			.catch(() => {
				toast.error('При получение списка групп произошла ошибка');
			});
	};

	const onSubmit: SubmitHandler<IFormGroup> = (value: IFormGroup) => {
		if (value.father_group === 'not') {
			value.father_group = null;
		}

		if (value.mother_group === 'not') {
			value.mother_group = null;
		}

		axios
			.post('http://87.251.79.100:8080/api/v1/groups', value)
			.then(() => {
				getGroupsFish();
				form.reset();

				toast.success('Успешно отправлено');
			})
			.catch(() => {
				toast.error('Произошла ошибка при создании группы');
			});
	};

	useEffect(() => {
		getGroupsFish();
	}, []);

	return (
		<form
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '1rem',
				justifyContent: 'center',
				padding: '2rem'
			}}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Typography variant="h5">
				Добавить группу
			</Typography>
			<Box
				maxWidth="17rem"
				width="100%"
				display="flex"
				flexDirection="column"
				gap="30px"
				padding="2rem"
				borderRadius="10px"
				bgcolor="white"
				boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
			>
				<FormControl>
					<InputLabel>Номер группы</InputLabel>

					<Controller
						name={'id'}
						control={control}
						render={({ field }) => (
							<Input
								value={field.value}
								onChange={field.onChange}
								inputRef={field.ref}
							/>
						)}
					/>
				</FormControl>

				<FormControl variant="standard">
					<InputLabel>Вид</InputLabel>

					<Controller
						name={'breed'}
						control={control}
						render={({ field }) => (
							<Select
								label="123"
								value={field.value}
								onChange={field.onChange}
								inputRef={field.ref}
							>
								<MenuItem value={'Лосось'}>Лосось</MenuItem>
								<MenuItem value={'Форель'}>Форель</MenuItem>
							</Select>
						)}
					/>
				</FormControl>

				<FormControl variant="standard">
					<InputLabel>Пол</InputLabel>

					<Controller
						name={'sex'}
						control={control}
						render={({ field }) => (
							<Select
								value={field.value}
								onChange={field.onChange}
								inputRef={field.ref}
							>
								<MenuItem value={'М'}>М</MenuItem>
								<MenuItem value={'Ж'}>Ж</MenuItem>
							</Select>
						)}
					/>
				</FormControl>

				<FormControl variant="standard">
					<InputLabel>Группа папы</InputLabel>

					<Controller
						name={'father_group'}
						control={control}
						render={({ field }) => (
							<Select
								value={field.value}
								onChange={field.onChange}
								inputRef={field.ref}
								defaultValue={'not'}
							>
								{optionsGroupsFish.map((item, index) => (
									<MenuItem key={index} value={item.value}>
										{item.text}
									</MenuItem>
								))}
							</Select>
						)}
					/>
				</FormControl>

				<FormControl variant="standard">
					<InputLabel>Группа мамы</InputLabel>

					<Controller
						name={'mother_group'}
						control={control}
						render={({ field }) => (
							<Select
								value={field.value}
								onChange={field.onChange}
								inputRef={field.ref}
								defaultValue={'not'}
							>
								{optionsGroupsFish.map((item, index) => (
									<MenuItem key={index} value={item.value}>
										{item.text}
									</MenuItem>
								))}
							</Select>
						)}
					/>
				</FormControl>
			</Box>
			<Button variant='contained' type="submit">Отправить</Button>
		</form>
	);
};
