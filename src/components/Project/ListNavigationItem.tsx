import { useNavigate, useParams } from 'react-router-dom';
import { SnackList } from '../../redux/lists/types';
import useToggle from '../../hooks/useToggle';
import { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { removeList, selectTasksByListId } from '../../redux/lists';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import ProjectOptions from './ListOptions';
import CircleProgress from '../ui/progress/CircleProgress';
import { SnackTaskStatus } from '../../redux/tasks/types';

function ListNavigationItem({ list }: { list: SnackList }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const isActive = id === list.id;
	const [isDropdownOpen, toggleDropdown] = useToggle(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const prevListDetails = useRef(list);
	const tasksInList = useAppSelector(selectTasksByListId(list.id));

	const progress = useMemo(
		() =>
			tasksInList.length === 0
				? 0
				: tasksInList.filter((task) => task.status === SnackTaskStatus.Complete)
						.length / tasksInList.length,
		[tasksInList, list.id],
	);

	const dispatch = useAppDispatch();

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
			// onContextMenu={(e) => {
			// 	// we want a right click
			// 	toggleDropdown();
			// 	e.preventDefault();
			// 	e.stopPropagation();
			// }}
			onClick={onNavigate}
			className="relative flex flex-col justify-center group context-action">
			<button
				className={cn(
					'flex items-center gap-2 py-1.5 px-4 font-normal rounded-lg ',
					isActive && 'bg-surface-5',
				)}>
				<CircleProgress
					progress={progress}
					color={list.color as any}
				/>

				<p className="flex-1 text-left">{list.name}</p>
				<p className="flex items-center gap-2">
					{list.tasks.length > 0 && (
						<p>
							<span className="p-1 font-semibold rounded text-surface-10">
								{list.tasks.length}
							</span>
						</p>
					)}
					{isDropdownOpen && (
						<ProjectOptions
							id={list.id}
							onDelete={onDelete}
						/>
					)}
				</p>
			</button>
		</motion.div>
	);
}

export default ListNavigationItem;
