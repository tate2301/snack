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
					isOpen={isOpen}
					onClose={toggle}>
					<form className="space-y-4">
						<div className="space-y-1 flex flex-col rounded-xl">
							<input
								name="title"
								className="p-2 font-semibold bg-transparent outline-none"
								placeholder="Category title"
							/>
							<Textarea
								name={'description'}
								placeholder="Description (optional)"
								className="p-2 font-semibold bg-transparent outline-none"
							/>
						</div>
						<div className="w-full flex justify-end space-x-4">
							<button className="border rounded-lg px-2 py-1 shadow-sm border-zinc-400/30">
								Cancel
							</button>
							<button className="border rounded-lg px-2 py-1 border-zinc-400/30 bg-primary-10 shadow-sm text-white">
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
