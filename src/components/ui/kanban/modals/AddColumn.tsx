import useToggle from '../../../../hooks/useToggle';
import { PlusIcon } from '@heroicons/react/24/outline';
import Textarea from '../../input/textarea';
import Modal from '../../modal';

const AddColumn = () => {
	const [isOpen, toggle] = useToggle(false);

	return (
		<>
			<button
				onClick={toggle}
				className="space-x-4 bg-surface-3 p-4 rounded-xl w-96 hover:text-surface-12 hover:bg-surface-4">
				<PlusIcon className="w-5 h-5" />
				Add column
			</button>
			{isOpen && (
				<Modal
					title="Create new column"
					description="A column can be used to group tasks together, by status or some criteria"
					isOpen={isOpen}
					onClose={toggle}>
					<form className="space-y-4">
						<div className="space-y-8 flex flex-col rounded-xl">
							<div className="space-y-2">
								<label
									htmlFor="title"
									className="font-medium text-surface-10">
									Title
								</label>
								<input
									name="title"
									className="p-2 font-semibold w-full outline outline-zinc-400/20 focus:outline-zinc-400/30 rounded-lg focus:bg-white bg-surface-3 focus:shadow"
									placeholder="Category title"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="description"
									className="font-medium text-surface-10">
									Description
								</label>
								<Textarea
									name={'description'}
									placeholder="Description (optional)"
									className="p-2 font-semibold bg-surface-3 focus:bg-white outline outline-zinc-400/20 focus:outline-zinc-400/20 w-full rounded-lg focus:shadow"
									rows={3}
								/>
							</div>
						</div>
						<div className="w-full flex justify-end space-x-4">
							<button className="border rounded-xl px-6 py-2 shadow-sm border-zinc-400/30">
								Cancel
							</button>
							<button className="rounded-xl px-6 py-2 bg-primary-10 shadow-sm text-white">
								Done
							</button>
						</div>
					</form>
				</Modal>
			)}
		</>
	);
};

export default AddColumn;
