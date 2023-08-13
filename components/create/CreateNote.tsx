import useToggle from '../../hooks/useToggle';
import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { LinkIcon, PlusIcon } from '@heroicons/react/24/outline';
import CalendarIcon from '../../icons/CalendarIcon';

const CreateNote = () => {
	const [isFocused, toggle] = useToggle(false);
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, toggle);

	return (
		<div className={'group'}>
			<AnimatePresence>
				{!isFocused && <motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					type='button'
					onClick={toggle}
					className='relative flex items-center font-normal bg-surface-6 rounded-xl w-full p-4 hover:bg-surface-7'>
					<PlusIcon className='h-5 w-5' aria-hidden='true' />
					<span className={'text-surface-10'}>
					Insert text, link or drag n drop image
				</span>
				</motion.button>}
				{isFocused &&
					<motion.div ref={ref} initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className={'flex flex-col gap-2 items-start bg-white p-4 rounded-xl shadow'}
					>
						<div className={'flex-1'}>
							<input
								placeholder={'Title'}
								className={'outline-none ring-0 w-full p-1 rounded-xl text-surface-12'}
								autoFocus />
							<textarea placeholder={'Write anything you want to remember...'}
												className={'outline-none ring-0 w-full p-1 text-surface-10 rounded-xl text-sm'} />
						</div>
						<div className={'flex items-center gap-2'}>
							<button className={'p-2 rounded-xl bg-surface-4 hover:bg-surface-6'}>
								<CalendarIcon className={'h-5 w-5'} />
							</button>
							<button className={'p-2 rounded-xl bg-surface-4 hover:bg-surface-6'}>
								<LinkIcon className={'h-5 w-5'} />
							</button>
						</div>
					</motion.div
					>}

			</AnimatePresence>
		</div>
	);
};

export default CreateNote;