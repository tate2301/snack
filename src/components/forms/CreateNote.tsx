import React from "react";

import useToggle from '../../lib/hooks/useToggle';
import { useRef } from 'react';
import useClickOutside from '../../lib/hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { ClockIcon, PlusIcon } from '@heroicons/react/24/outline';
import Textarea from '../ui/input/textarea';
import Kbd from '../ui/typography/Kbd';
import ExternalLink from '../../assets/icons/ExternalLink';

const CreateNote = () => {
	const [isFocused, toggle] = useToggle(false);
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, toggle);

	return (
		<div className={'group'}>
			<AnimatePresence>
				{!isFocused && (
					<motion.button
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						type="button"
						onClick={toggle}
						className="relative flex items-center font-normal bg-surface-6 rounded-xl w-full p-4 hover:bg-surface-7">
						<PlusIcon
							className="h-5 w-5"
							aria-hidden="true"
						/>
						<span className={'text-surface-10'}>
							Insert text or paste a link
						</span>
					</motion.button>
				)}
				{isFocused && (
					<motion.div
						ref={ref}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={
							'flex flex-col gap-2 items-start bg-white p-4 rounded-xl shadow'
						}>
						<div className={'flex-1 flex items-start w-full'}>
							<input
								type={'checkbox'}
								disabled
								className={'!bg-surface-6 flex-shrink-0'}
							/>
							<Textarea
								name="note"
								placeholder={'Insert text or paste a link'}
								className={
									'outline-none ring-0 flex-1 text-surface-12 w-full font-semibold'
								}
								autoFocus
							/>
						</div>
						<div className={'flex items-center gap-2'}>
							<button
								type={'button'}
								className={
									'p-2 rounded-xl bg-surface-2 hover:bg-warning-3 hover:text-warning-11 items-center text-surface-10'
								}>
								<ClockIcon className={'h-6 w-6'} />
								Reminder
							</button>
							<button
								type={'button'}
								className={
									'p-2 rounded-xl bg-surface-2 hover:bg-accent-3 hover:text-accent-11 text-surface-10'
								}>
								<ExternalLink className={'h-6 w-6'} />
								Link to task
							</button>
						</div>
						<div className={'flex items-center gap-2 mt-2'}>
							<p className={'flex items-center text-surface-9 text-sm'}>
								To add description, press
								<Kbd keys={['Shift', 'Enter']} />
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CreateNote;
