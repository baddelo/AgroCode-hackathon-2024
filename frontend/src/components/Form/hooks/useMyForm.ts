import { useFieldArray, useForm } from 'react-hook-form';
import { IForm } from '../types.ts';

export const useMyForm = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		...form
	} = useForm<IForm>({
		defaultValues: {
			fishes: [
				{
					id: null,
					weight: null,
					length: null,
					height: null,
					thickness: null,
					eggs_weight: null,
					egg_weight: null
				}
			]
		}
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'fishes'
	});

	return {
		register,
		control,
		handleSubmit,
		errors,
		fields,
		append,
		remove,
		form
	};
};