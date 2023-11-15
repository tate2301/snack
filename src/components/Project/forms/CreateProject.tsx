import React from 'react';

import { useEffect, useMemo, useRef } from 'react';
import useToggle from '../../../hooks/useToggle';
import { useAppDispatch } from '../../../redux/store';
import { useFormik } from 'formik';
import { getRandomColor } from '../constants';
import { SnackList } from '../../../redux/lists/types';
import { generateUUID } from '../../../lib/functions';
import {
	addListItem,
	defaultKanbanBoards,
	updateList,
} from '../../../redux/lists';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import Kbd from '../../ui/typography/Kbd';
import { Form } from '../../ui/input/form';
import SelectColor from './SelectColor';
import Textarea from '../../ui/input/textarea';

export enum ManageListFormAction {
	Create,
	Edit,
}

type ManageListFormProps = {};

type CreateListProps = {
	list?: never;
	action: ManageListFormAction.Create;
	isOpen?: never;
	toggle?: never;
	onOpenChangeCb?: never;
};

type EditListProps = {
	list: SnackList;
	action: ManageListFormAction.Edit;
	isOpen: boolean;
	toggle: (isOpen: boolean) => void;
	onOpenChangeCb: (isOpen: boolean) => void;
};

type ManageListAdditionalProps = CreateListProps | EditListProps;

function ManageListForm(
	props: ManageListFormProps & ManageListAdditionalProps,
) {
	const dispatch = useAppDispatch();

	const [isOpened, toggle, onOpenChange, onOpenChangeWithCallback] = useToggle(
		props.isOpen,
		props.onOpenChangeCb && ((v) => props.onOpenChangeCb(v)),
	);
	const ref = useRef<HTMLInputElement>(null);
	const isCreateForm = useMemo(
		() => props.action === ManageListFormAction.Create,
		[props.action],
	);

	const form = useFormik({
		initialValues: {
			title: '',
			color: getRandomColor(),
			description: '',
		},
		onSubmit: (values) => {
			if (!values.title) return toggle();
			const newList: SnackList = {
				name: values.title,
				color: values.color,
				id: isCreateForm ? generateUUID() : props.list.id,
				tasks: [],
				description: values.description,
				columns: defaultKanbanBoards,
			};

			if (isCreateForm) {
				dispatch(addListItem(newList));
			}

			if (!isCreateForm) {
				dispatch(updateList(newList));
			}

			form.resetForm();
			onOpenChangeWithCallback(false);
		},
	});

	useEffect(() => {
		if (!isCreateForm && form.values.title) {
			onOpenChange(props.isOpen);
		}
	}, [props, isCreateForm]);

	useEffect(() => {
		if (!isCreateForm) {
			form.setValues({
				title: props.list.name,
				color: props.list.color,
				description: props.list.description || '',
			});
		}
	}, [props]);

	return (
		<>
			<Dialog
				open={isOpened}
				onOpenChange={onOpenChangeWithCallback}>
				{isCreateForm && (
					<DialogTrigger>
						<button
							onClick={toggle}
							className="flex items-center w-full gap-4 p-0.5 hover:bg-zinc-900/10 text-surface-11 rounded-lg">
							<PlusIcon className="w-5 h-5" />
						</button>
					</DialogTrigger>
				)}
				<DialogContent className="p-6 pb-2">
					<Form.Root
						onSubmit={form.handleSubmit}
						className="rounded-lg">
						<>
							{
								// Dialog Headers
							}
							{isCreateForm && (
								<div className="mb-4">
									<DialogTitle>
										<p className="text-xl font-semibold text-surface-12">
											Create a new project
										</p>
									</DialogTitle>
									<DialogDescription>
										<p className="text-surface-10">
											Projects are lists of tasks. You can create as many
											projects as you need.
										</p>
									</DialogDescription>
								</div>
							)}
							{!isCreateForm && (
								<div className="mb-4">
									<DialogTitle>
										<p className="text-xl font-semibold text-surface-12">
											Edit project
										</p>
									</DialogTitle>
									<DialogDescription>
										<p className="text-surface-10">
											Edit your list name, description and color.
										</p>
									</DialogDescription>
								</div>
							)}
						</>
						<div className="flex items-start w-full gap-2 p-2 mb-4 border rounded-xl group border-surface-4">
							<SelectColor
								value={form.values.color}
								onChange={(color) => form.setFieldValue('color', color)}
							/>
							<div className="flex flex-col flex-1">
								<input
									ref={ref}
									name={'title'}
									{...form.getFieldProps('title')}
									autoFocus
									className="p-2 font-semibold bg-transparent outline-none"
									placeholder="Project name"
								/>
								<Textarea
									name={'description'}
									{...form.getFieldProps('description')}
									placeholder="Description (optional)"
									className="p-2 font-semibold bg-transparent outline-none"
								/>
							</div>
						</div>
						<DialogFooter>
							<div className="flex justify-end w-full gap-2">
								<button
									onClick={() => onOpenChangeWithCallback(false)}
									type={'button'}
									className="px-4 py-2 rounded-xl">
									Cancel
								</button>
								<button
									type={'submit'}
									onClick={form.submitForm}
									className="px-4 py-2 text-white bg-primary-10 rounded-xl">
									{isCreateForm && 'Create list'}
									{!isCreateForm && 'Save changes'}
								</button>
							</div>
						</DialogFooter>
					</Form.Root>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default ManageListForm;
