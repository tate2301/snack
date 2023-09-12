import { useNavigate, useParams } from 'react-router-dom';
import { SnackList } from '../../redux/lists/types';
import useToggle from '../../hooks/useToggle';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../redux/store';
import { removeList } from '../../redux/lists';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import ListOptions from './ListOptions';

function ListNavigationItem({ list }: { list: SnackList }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const isActive = id === list.id;
	const [isDropdownOpen, toggleDropdown] = useToggle(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const prevListDetails = useRef(list);

	const dispatch = useAppDispatch();

	const onEdit = (e) => {
		toggleDropdown();
		e.preventDefault();
		e.stopPropagation();
	};

	const onDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(removeList(list));
	};

	const onNavigate = (e) => {
		navigate(`/list/${list.id}`);
	};

	useEffect(() => {
		if (!isDropdownOpen) {
			prevListDetails.current = list;
			inputRef.current?.focus();
		}
	}, [isDropdownOpen, list]);

	return (
		<motion.div
			initial={{
				opacity: 0,
				height: 0,
			}}
			animate={{
				opacity: 1,
				height: 'auto',
			}}
			className="relative flex flex-col justify-center group">
			<button
				onClick={onNavigate}
				className={cn(
					'flex items-center gap-4 py-1 px-4 font-medium text-surface-12 rounded-xl ',
					isActive ? 'bg-surface-3' : 'hover:bg-surface-4',
				)}>
				<p
					style={{
						borderColor: `#${list.color}`,
					}}
					className="flex items-center h-4 gap-4 font-medium border-2 rounded-md aspect-square"></p>
				<p className="flex-1 text-left">{list.name}</p>
				<p className="flex items-center gap-2">
					{list.tasks.length > 0 && (
						<p>
							<span className="p-1 font-medium rounded text-surface-10">
								{list.tasks.length}
							</span>
						</p>
					)}
					<ListOptions
						id={list.id}
						onDelete={onDelete}
					/>
				</p>
			</button>
		</motion.div>
	);
}

export default ListNavigationItem;
