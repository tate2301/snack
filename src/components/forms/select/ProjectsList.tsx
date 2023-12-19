import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import { useAppSelector } from '../../../redux/store';
import { selectAllLists } from '../../../redux/lists';
import { memo, useEffect, useState } from 'react';
import SFSymbol from '../../../assets/icons/SFSymbol';

const ProjectList = (props: {
	defaultListId?: string;
	onChange: (val: string) => void;
}) => {
	const [defaultValue, setDefaultValue] = useState(props.defaultListId);

	const lists = useAppSelector(selectAllLists);

	useEffect(() => {
		setDefaultValue(defaultValue);
	}, [props.defaultListId]);

	return (
		<Select
			defaultValue={defaultValue}
			onValueChange={props.onChange}>
			<SelectTrigger className="min-w-[120px] w-fit !text-surface-12 p-2">
				<div className="flex gap-4">
					<SelectValue
						className="text-surface-12"
						placeholder={'No list'}
					/>
				</div>
			</SelectTrigger>
			<SelectContent>
				{lists.map((list) => (
					<SelectItem
						key={list.id}
						value={list.id}
						className="flex">
						<p className="flex items-center gap-4">
							<SFSymbol
								name={'folder'}
								color={'#808080'}
							/>
							{list.name}
						</p>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default memo(ProjectList);
