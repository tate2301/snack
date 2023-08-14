import { PlusIcon } from '@heroicons/react/24/outline';
import Popover from '../ui/popover';
import { useFormik } from 'formik';

function AddNewCalendar(props: { onCreateCalendar: (title: string) => void }) {
	const form = useFormik({
		initialValues: {
			title: '',
		},
		onSubmit: (values) => {
			console.log({ values });
		},
	});

	return (
		<Popover>
			<Popover.Trigger>
				<button className="flex items-center gap-4 p-2 text-surface-10 hover:bg-surface-3 rounded-xl">
					<PlusIcon className="w-6 h-6" />
				</button>
			</Popover.Trigger>
			<Popover.Content>
				<form
					onSubmit={form.handleSubmit}
					className="flex flex-col gap-4">
					<input
						className="p-4 rounded-xl bg-surface-4 focus:bg-white"
						name={'title'}
						placeholder="Add a name"
						value={form.values.title}
						onChange={form.handleChange}
					/>
					<button
						type={'submit'}
						className="bg-primary-10 text-white rounded-xl items-center justify-center flex p-4">
						Add new calendar
					</button>
				</form>
			</Popover.Content>
		</Popover>
	);
}

export default AddNewCalendar;
