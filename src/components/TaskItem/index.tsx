import React from "react";

import {
	ArchiveBoxIcon,
	ListBulletIcon,
	RectangleStackIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Subtask from './Subtask';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';

const useWhileHover = () => {
	const [isHovering, toggleHovering] = useToggle(false);
	const hover = () => toggleHovering();

	return { isHovering, hover };
};

export default function TaskItem({
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
		<div className="px-4 py-1 transition-all rounded-xl hover:bg-zinc-50 dark:bg-transparent">
			{inFocus && (
				<button className="flex items-center gap-2 px-2 py-1 mb-2 text-sm font-medium border rounded-xl shadow text-zinc-500 bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-300 border-zinc-800">
					<RectangleStackIcon className="w-4 h-4" />
					Personal Website
				</button>
			)}

			<div
				onMouseEnter={hover}
				onMouseLeave={hover}
				className="flex items-start w-full gap-4 py-1 rounded-xl group dark:text-white">
				<input
					checked={isComplete}
					className="mt-1 rounded-xl"
					type="checkbox"
					onChange={toggleComplete}
				/>
				<AnimatePresence>
					<div className="w-full">
						<div className="flex flex-col flex-1 w-full">
							<div
								onClick={expand}
								className="flex items-start justify-between w-full gap-2 cursor-pointer">
								<p
									className={clsx(
										'transition-all inline w-full',
										isComplete
											? 'line-through dark:text-zinc-300 text-zinc-400 line-clamp-1'
											: '',
									)}>
									<span className="w-full">Configure web fonts</span>
								</p>
							</div>
							<AnimatePresence>
								{(!isComplete || isExpanded) && (
									<motion.div
										initial={{ opacity: 1, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ ease: 'linear' }}>
										<>
											{isExpanded && (
												<p
													contentEditable
													className={`text-zinc-500 dark:text-zinc-300 mt-2 ${
														isExpanded ? 'line-clamp-6' : 'line-clamp-2'
													}`}>
													Its crucial to get this done as soon as possible, we
													rely on it to get more funding.
												</p>
											)}

											{isExpanded && (
												<motion.div
													className={`flex gap-2 items-center mt-1 justify-between`}>
													<p className="mt-1 text-sm font-bold dark:text-zinc-500 text-zinc-900">
														<span className="mr-2 text-zinc-700">
															28/7/2023 12:00 PM
														</span>
													</p>
													<div className={`flex gap-2 items-center`}>
														<button
															className={
																'p-2 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 right-0'
															}
															onClick={expand}>
															<ArchiveBoxIcon className={'w-4 h-4'} />
														</button>
														<button
															className={
																'p-2 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 right-0'
															}
															onClick={expand}>
															<TrashIcon className={'w-4 h-4'} />
														</button>
													</div>
												</motion.div>
											)}
										</>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						<motion.div
							exit={{ height: 0, opacity: 0 }}
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}>
							{isExpanded && (
								<motion.div
									exit={{ height: 0, opacity: 0 }}
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									className="flex gap-4 mt-2">
									<button
										onClick={toggle}
										className="flex items-center gap-2 px-2 py-1 text-sm font-medium rounded-xl text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
										<ListBulletIcon className="w-4 h-4" />3 Tasks
									</button>
								</motion.div>
							)}
							<AnimatePresence>
								{((isShowing && isExpanded) || inFocus) && (
									<motion.div
										exit={{ height: 0, opacity: 0 }}
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										className="flex flex-col mt-2 @container">
										<Subtask />

										{isShowing && (
											<>
												<Subtask />

												<Subtask />

												<Subtask />

												<Subtask />

												<Subtask />
											</>
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					</div>
				</AnimatePresence>
			</div>
		</div>
	);
}
