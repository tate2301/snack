import React from "react";

import { useFormik } from 'formik';
import { selectListById, updateList } from '../../../../redux/lists';
import SelectColor from './SelectColor';
import { Dialog, DialogContent } from '../../../../components/ui/dialog';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';

function EditList({ id, isOpen, toggle }) {
	const list = useAppSelector(selectListById(id));
	const dispatch = useAppDispatch();
	const form = useFormik({
		initialValues: {
			name: list.name,
			color: list.color,
		},
		onSubmit: (values) => {
			dispatch(
				updateList({
					...list,
					name: values.name !== '' ? values.name : list.name,
					color: values.color,
				}),
			);
		},
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={toggle}>
			<DialogContent>
				<form
					onSubmit={form.handleSubmit}
					className="fixed z-50 flex justify-end w-auto h-auto gap-2 p-2 shadow rounded-xl bg-surface-12">
					<SelectColor
						value={form.values.color}
						onChange={(color) => form.setFieldValue('color', color)}
					/>
					<input
						autoFocus
						name={'name'}
						value={form.values.name}
						onChange={form.handleChange}
						className="flex-1 text-left text-white bg-transparent outline-none"
						maxLength={30}
					/>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default EditList;
