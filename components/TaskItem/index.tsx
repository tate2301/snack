import { ArchiveBoxIcon, ClockIcon, ListBulletIcon, RectangleStackIcon, TrashIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { timeDifference } from '../../lib/time';
import Subtask from './Subtask';
import useToggle from '../../lib/hooks/useToggle';
import clsx from 'clsx';

const useWhileHover = () => {
	const [isHovering, toggleHovering] = useToggle(false);
	const hover = () => toggleHovering();
	return { isHovering, hover };
};

export default function TaskItem({ id }) {
	const [isComplete, toggleComplete] = useToggle(false);
	const [isShowing, setIsShowing] = useState(false);
	const toggle = () => setIsShowing(!isShowing);

	const [isExpanded, setIsExpanded] = useState(false);
	const expand = () => setIsExpanded(!isExpanded);
	const { isHovering, hover } = useWhileHover();
	return (
		<div onMouseEnter={hover} onMouseLeave={hover}
				 className='py-2 rounded-xl group flex gap-2 items-start w-full group'>
			<input
				checked={isComplete}
				className='rounded-xl mt-1'
				type='checkbox'
				onChange={toggleComplete}
			/>

			<AnimatePresence>
				<div className='w-full'>
					<div className='w-full flex border-b pb-2 justify-between items-start gap-4 relative'>

						<div className='flex flex-col flex-1'>
							<div className='flex gap-1 justify-between items-start'>

								<p className={clsx(
									'font-bold transition-all inline',
									isComplete ? 'line-through text-zinc-400 line-clamp-1' : 'font-bold',
								)}>
									<button
										onClick={expand}
										className='flex items-center gap-2 transition-all duration-200 inline-flex'
									>
										<motion.span initial={{ transform: 'none' }}
																 animate={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
											<ChevronDownIcon className='w-4 h-4' />
										</motion.span>
									</button>
									<span contentEditable>
                    Configure Domain Name for the idea factory company
                  </span>
								</p>
							</div>
							<motion.div layout>
								{(!isComplete || isExpanded) && (
									<>
										<p
											contentEditable
											className={`text-sm text-zinc-400 mt-2 ${
												isExpanded ? 'line-clamp-6' : 'line-clamp-2'
											}`}
										>
											Its crucial to get this done as soon as possible, we rely
											on it to get more funding. Which we can agree we
											critically need
										</p>
										<p className='text-sm text-zinc-600 mt-1 font-bold'>
											<span className='mr-2'>28/7/2023 12:00 PM</span>
											<span className=''>Due in 2 days</span>
										</p>
										<AnimatePresence>
											{isHovering && (
												<motion.div
													initial={{ opacity: 1, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ ease: 'linear', delay: 0.001 }}

													className={`flex gap-2 items-center mt-1 justify-between`}>
													<button className='text-sm mt-1 font-bold'>
												<span className='flex items-center gap-2 text-orange-500'>
													<ClockIcon className='w-4 h-4' />
													{timeDifference(
														new Date('2023-07-21T12:00:00.000Z'),
														new Date(),
													)}{' '}
													before
												</span>
													</button>
													<div className={`flex gap-2 items-center`}>
														<button className={'p-2 rounded-lg bg-zinc-50 text-zinc-600 right-0'}
																		onClick={expand}>
															<ArchiveBoxIcon className={'w-4 h-4'} />
														</button>
														<button className={'p-2 rounded-lg bg-zinc-50 text-zinc-600 right-0'}
																		onClick={expand}>
															<TrashIcon className={'w-4 h-4'} />
														</button>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</>
								)}
							</motion.div>
						</div>
					</div>
					<motion.div layout>
						{isExpanded && (
							<motion.div
								exit={{ height: 0, opacity: 0 }}
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								className='mt-2 flex gap-4'
							>
								<button
									onClick={toggle}
									className='text-sm font-bold flex gap-2 items-center  text-zinc-500 rounded-lg bg-zinc-100 py-1 px-2'
								>
									<ListBulletIcon className='w-4 h-4' />3 Tasks
								</button>
								<button
									className='text-sm flex font-bold gap-2 items-center  text-zinc-500 rounded-lg bg-zinc-100 py-1 px-2'>
									<RectangleStackIcon className='w-4 h-4' />
									Personal Website
								</button>
							</motion.div>
						)}
					</motion.div>
					<motion.div layout>
						{isShowing && isExpanded && (
							<motion.div
								exit={{ height: 0, opacity: 0 }}
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								className='mt-2 flex flex-col'
							>
								<Subtask />

								<Subtask />

								<Subtask />

								<Subtask />

								<Subtask />

								<Subtask />
							</motion.div>
						)}
					</motion.div>
				</div>
			</AnimatePresence>
		</div>
	);
}
