import React, { ReactNode } from 'react';

import {
	EllipsisVerticalIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import Dropdown from '../../../components/ui/dropdown-menu';
import EditList from './forms/EditList';
import useToggle from '../../../lib/hooks/useToggle';
import ManageListForm, { ManageListFormAction } from './forms/CreateProject';
import { selectListById } from '../../../redux/lists';
import { useAppSelector } from '../../../redux/store';
import SFSymbol from '../../../assets/icons/SFSymbol';
import Divider from '../../../components/ui/divider/Divider';

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
				className="hover:bg-zinc-900/10 flex items-center p-1 rounded-lg">
				<SFSymbol
					name={'square.and.pencil'}
					color={'#121212'}
				/>
			</button>
			<Divider
				direction={'vertical'}
				color={'border-surface-6'}
			/>
			{props.id !== 'default' && (
				<button
					onClick={props.onDelete}
					className="hover:bg-zinc-900/10 flex items-center p-1 rounded-lg">
					<SFSymbol
						name={'trash'}
						color={'#121212'}
					/>
				</button>
			)}
		</>
	);
};

export default ProjectOptions;
