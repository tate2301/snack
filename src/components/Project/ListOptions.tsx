import React, { ReactNode } from 'react';

import {
	EllipsisVerticalIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import Dropdown from '../ui/dropdown-menu';
import EditList from './forms/EditList';
import useToggle from '../../hooks/useToggle';
import ManageListForm, { ManageListFormAction } from './forms/CreateProject';
import { selectListById } from '../../redux/lists';
import { useAppSelector } from '../../redux/store';

const ProjectOptions = (props: { id: string; onDelete: (e) => void }) => {
	const list = useAppSelector(selectListById(props.id));
	const [isEditModalOpen, toggleEditModal, onEditModalOpenChanged] =
		useToggle(false);

	const openEditModal = (e) => {
		// e.preventDefault();
		e.stopPropagation();
		toggleEditModal();
	};

	return (
		<>
			<ManageListForm
				isOpen={isEditModalOpen}
				onOpenChangeCb={onEditModalOpenChanged}
				list={list}
				action={ManageListFormAction.Edit}
				toggle={toggleEditModal}
			/>

			<button
				onClick={openEditModal}
				className="hover:bg-zinc-900/10 flex items-center p-1.5 rounded-lg">
				<PencilIcon className="w-5 h-5" />
			</button>

			{props.id !== 'default' && (
				<button
					onClick={props.onDelete}
					className="hover:bg-zinc-900/10 flex items-center p-2 rounded-lg">
					<TrashIcon className="w-5 h-5" />
				</button>
			)}
		</>
	);
};

export default ProjectOptions;
