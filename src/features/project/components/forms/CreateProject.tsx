import React from 'react';

import { useEffect, useMemo, useRef } from 'react';
import useToggle from '../../../../lib/hooks/useToggle';
import { useAppDispatch } from '../../../../redux/store';
import { useFormik } from 'formik';
import { getRandomColor } from '../constants';
import { SnackList } from '../../../../redux/lists/types';
import { generateUUID } from '../../../../lib/functions';
import {
	addListItem,
	defaultKanbanBoards,
	updateList,
} from '../../../../redux/lists';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '../../../../components/ui/dialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import Kbd from '../../../../components/ui/typography/Kbd';
import { Form } from '../../../../components/ui/input/form';
import SelectColor from './SelectColor';
import Textarea from '../../../../components/ui/input/textarea';
import SFSymbol from '../../../../assets/icons/SFSymbol';

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
							className="flex items-center w-full gap-4 text-surface-11 rounded-lg">
							<SFSymbol
								name={'folder.badge.plus'}
								color={'#808080'}
							/>
						</button>
					</DialogTrigger>
				)}
				<DialogContent className="p-6 pb-2">
					<Form.Root
						onSubmit={form.handleSubmit}
						className="rounded-lg">
						<>
							<div className="mb-4">
								<div className="flex justify-between w-full gap-2">
									<button
										onClick={() => onOpenChangeWithCallback(false)}
										type={'button'}
										className="rounded-xl text-base text-danger-11">
										Cancel
									</button>
									<DialogTitle>
										<p className="font-semibold text-base text-surface-12">
											{isCreateForm ? 'Add Project' : 'Edit Project'}
										</p>
									</DialogTitle>
									<button
										type={'submit'}
										onClick={form.submitForm}
										className="disabled:text-surface-6 text-primary-11 rounded-xl">
										{isCreateForm && 'Create list'}
										{!isCreateForm && 'Save changes'}
									</button>
								</div>
							</div>
						</>
						<div className="flex flex-col flex-1">
							<div className={'flex gap-4 items-center mb-4'}>
								<p className={'w-24 text-right text-surface-10'}>Name:</p>
								<input
									ref={ref}
									name={'title'}
									{...form.getFieldProps('title')}
									autoFocus
									className="p-2 flex-1 font-semibold bg-transparent border focus:border focus:border-zinc-400/30 focus:shadow-sm rounded-lg border-surface-3"
									placeholder="Project name"
								/>
							</div>
							<div className={'flex gap-4'}>
								<p className={'w-24 text-right text-surface-10'}>
									Description:
								</p>
								<textarea
									name={'description'}
									{...form.getFieldProps('description')}
									placeholder="Description (optional)"
									className="p-2 flex-1 font-semibold bg-transparent border focus:border focus:border-zinc-400/30 focus:shadow-sm rounded-lg border-surface-3 mb-4"
								/>
							</div>
						</div>
					</Form.Root>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default ManageListForm;
