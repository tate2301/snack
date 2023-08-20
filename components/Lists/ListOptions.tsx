import { EllipsisVerticalIcon, PencilIcon } from '@heroicons/react/24/outline';
import Dropdown from '../ui/dropdown-menu';
import TrashIcon from '../../icons/TrashIcon';
import EditList from './forms/EditList';
import useToggle from '../../hooks/useToggle';
import ManageListForm, { ManageListFormAction } from './forms/CreateList';
import { selectListById } from '../../redux/lists';
import { useAppSelector } from '../../redux/store';

const ListOptions = (props: { id: string; onDelete: (e) => void }) => {
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
			<Dropdown>
				<Dropdown.Trigger>
					<p className="p-1 rounded-md text-surface-8 hover:text-surface-12 hover:bg-surface-1">
						<EllipsisVerticalIcon className="w-5 h-5" />
					</p>
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Item onClick={openEditModal}>
						<p className="flex items-center gap-4">
							<PencilIcon className="w-5 h-5" />
							<span>Edit list</span>
						</p>
					</Dropdown.Item>

					{props.id !== 'default' && (
						<Dropdown.Item onClick={props.onDelete}>
							<p className="flex items-center gap-4">
								<TrashIcon className="w-5 h-5" />
								<span>Delete</span>
							</p>
						</Dropdown.Item>
					)}
				</Dropdown.Content>
			</Dropdown>
		</>
	);
};

export default ListOptions;
