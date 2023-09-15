import React from 'react';

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
			<SelectTrigger className="min-w-[120px] w-fit text-surface-12 p-2">
				<div className="flex gap-4 p-2">
					<SelectValue placeholder={'No list'} />
				</div>
			</SelectTrigger>
			<SelectContent>
				{lists.map((list) => (
					<SelectItem
						key={list.id}
						value={list.id}
						className="flex">
						<p className="flex items-center gap-4">
							<span
								style={{
									borderColor: `#${list.color}`,
								}}
								className="w-4 h-4 border-2 rounded-md"
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