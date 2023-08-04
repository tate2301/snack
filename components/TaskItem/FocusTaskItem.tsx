import {
	ArchiveBoxIcon,
	ArrowPathIcon,
	ClipboardIcon,
	ClockIcon,
	Square3Stack3DIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Subtask from './Subtask';
import useToggle from '../../lib/hooks/useToggle';
import clsx from 'clsx';
import {
	BoltIcon,
	CalendarDaysIcon,
	ListBulletIcon,
	PlusIcon,
	VideoCameraIcon,
} from '@heroicons/react/24/solid';
import FocusPeriod from '../focus/Focus';

const useWhileHover = () => {
	const [isHovering, toggleHovering] = useToggle(false);
	const hover = () => toggleHovering();

	return { isHovering, hover };
};

export default function FocusTaskItem({
	id,
	inFocus,
}: {
	id: number;
	inFocus?: boolean;
}) {
	const [isComplete, toggleComplete] = useToggle(false);
	const [isShowing, setIsShowing] = useState(false);
	const toggle = () => setIsShowing(!isShowing);

	const [isExpanded, setIsExpanded] = useState(false);
	const expand = () => setIsExpanded(!isExpanded);
	const { isHovering, hover } = useWhileHover();
	return (
		<div className="transition-all divide-y rounded-lg divide-zinc-100">
			<div className={`flex gap-2 items-baseline justify-between px-4 py-2`}>
				<p className="flex gap-1 mt-1 text-sm font-bold dark:text-zinc-500 text-zinc-900">
					<button className="flex gap-2 p-1 mr-2 uppercase rounded bg-zinc-100">
						<CalendarDaysIcon className="w-4 h-4 text-zinc-400" />
						28/7/2023
					</button>
					<button className="flex gap-2 p-1 mr-2 uppercase rounded bg-zinc-100">
						<ClockIcon className="w-4 h-4 text-zinc-400" />
						12:00 pm
					</button>
				</p>
				<div className={`flex gap-2 items-center`}>
					<button
						className={
							'p-2 rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 right-0'
						}>
						<ArchiveBoxIcon className={'w-4 h-4'} />
					</button>
					<button
						className={
							'p-2 rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 right-0'
						}>
						<TrashIcon className={'w-4 h-4'} />
					</button>
				</div>
			</div>
			<div
				onMouseEnter={hover}
				onMouseLeave={hover}
				className="flex items-start w-full gap-4 px-4 py-4 pb-2 mt-2 group dark:text-white">
				<input
					checked={isComplete}
					className="mt-1 rounded-xl"
					type="checkbox"
					onChange={toggleComplete}
				/>
				<div className="w-full">
					<div
						onClick={expand}
						className="items-start justify-between w-full cursor-pointer ">
						<p
							className={clsx(
								'transition-all inline font-semibold',
								isComplete
									? 'line-through dark:text-zinc-300 text-zinc-400 line-clamp-1'
									: '',
							)}>
							<span>Configure web fonts</span>
						</p>
					</div>
					<p
						contentEditable
						spellCheck={'false'}
						className={`text-zinc-400 dark:text-zinc-300`}>
						Its crucial to get this done as soon as possible, we rely on it to
						get more funding.
					</p>
					<div className="flex items-start gap-2 mt-2">
						<p className="flex px-2 py-1 mt-2 text-sm font-semibold uppercase rounded-lg w-fit bg-zinc-100">
							<BoltIcon className="w-4 h-4 mr-2 text-zinc-400" />
							00:00:00
						</p>
						<p className="flex px-2 py-1 mt-2 text-sm font-semibold uppercase rounded-lg w-fit bg-zinc-100">
							<ListBulletIcon className="w-4 h-4 mr-2 text-zinc-400" />
							4/10
						</p>
						<p className="flex px-2 py-1 mt-2 text-sm font-semibold uppercase rounded-lg w-fit bg-zinc-100">
							<ArrowPathIcon className="w-4 h-4 mr-2 text-zinc-400" />
							Repeats yearly
						</p>
					</div>
				</div>
			</div>
			<div className="px-4 py-4 mt-4">
				<FocusPeriod />
				<div className="flex flex-col mt-2">
					<div className="flex justify-between mt-4 rounded-xl hover:bg-zinc-50 text-zinc-500">
						<button className="inline-flex items-center w-full gap-4 px-2 py-2 font-mono text-sm font-semibold uppercase">
							<ChevronDownIcon className="w-5 h-5" />
							Burnout 🔥 Session
						</button>
						<button className="flex gap-4 px-2 py-1 rounded-lg hover:bg-zinc-50">
							<PlusIcon className="w-5 h-5" />
						</button>
					</div>
					<Subtask />

					<Subtask />

					<Subtask />

					<Subtask />

					<Subtask />

					<Subtask />
					<button className="flex gap-4 px-2 py-1 rounded hover:bg-zinc-50">
						<PlusIcon className="w-5 h-5" />
						<span className="font-semibold text-zinc-500">Add subtask</span>
					</button>
				</div>
			</div>
		</div>
	);
}
