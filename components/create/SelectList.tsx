import { ChevronDownIcon, FolderIcon } from '@heroicons/react/20/solid';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useAppSelector } from '../../redux/store';
import { selectAllLists } from '../../redux/lists';

const SelectList = (props: {
	defaultListId?: string;
	onChange: (val: string) => void;
}) => {
	const lists = useAppSelector(selectAllLists);

	return (
		<Select
			defaultValue={props.defaultListId}
			onValueChange={props.onChange}>
			<SelectTrigger className="min-w-[120px] w-fit">
				<div className="flex gap-4">
					<SelectValue placeholder={'No list'} />
				</div>
			</SelectTrigger>
			<SelectContent>
				<div className="w-64 flex justify-between">
					<p className="text-md font-semibold p-2">Select a list</p>
				</div>
				{lists.map((list) => (
					<SelectItem
						key={list.id}
						value={list.id}
						className="flex">
						<p className="flex gap-4 items-center">
							<span
								style={{
									borderColor: `var(--${list.color}-10)`,
								}}
								className="w-5 h-5 border-2 rounded-xl"
							/>
							{list.name}
						</p>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SelectList;
