import useToggle from '../../hooks/useToggle';
import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { LinkIcon, PlusIcon } from '@heroicons/react/24/outline';
import CalendarIcon from '../../icons/CalendarIcon';
import clsx from 'clsx';

const CreateTask = () => {
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
					className={clsx('relative flex items-center font-normal bg-surface-6 rounded-xl w-full p-4 hover:bg-surface-7')}>
					<PlusIcon className='h-5 w-5' aria-hidden='true' />
					<span className={'text-surface-11'}>
					Create a new task
				</span>
				</motion.button>}
				{isFocused &&
					<motion.div ref={ref} initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className={'flex flex-col gap-2 items-start bg-white p-4 rounded-xl shadow'}
					>
						<div className={'flex-1 flex items-center w-full'}>
							<input type={'checkbox'} disabled className={'!bg-surface-6 flex-shrink-0'} />
							<input
								placeholder={'Create a new task'}
								className={'outline-none ring-0 flex-1 p-1 rounded-xl text-surface-12 w-full font-medium'}
								autoFocus />
						</div>

						<div className={'flex items-center gap-2'}>
							<button type={'button'} className={'p-2 rounded-xl bg-surface-2 hover:bg-surface-4'}>
								<CalendarIcon className={'h-5 w-5'} />
							</button>
							<button type={'button'} className={'p-2 rounded-xl bg-surface-2 hover:bg-surface-4'}>
								<LinkIcon className={'h-5 w-5'} />
							</button>
						</div>
					</motion.div
					>}

			</AnimatePresence>
		</div>
	);
};

export default CreateTask;