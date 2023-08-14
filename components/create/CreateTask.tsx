import useToggle from '../../hooks/useToggle';
import { useCallback, useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { ClockIcon, LinkIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Textarea from '../ui/input/textarea';
import { useAppDispatch } from '../../redux/store';
import { useForm } from 'react-hook-form';
import {
	SnackTask,
	SnackTaskPriority,
	SnackTaskStatus,
} from '../../redux/tasks/types';
import { generateUUID } from '../../lib/functions';
import { addTask } from '../../redux/tasks';
import { useFormik } from 'formik';

const CreateTask = () => {
	const [isFocused, toggle] = useToggle(false);

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
						className={clsx(
							'relative flex items-center font-normal bg-surface-6 rounded-xl w-full p-4 hover:bg-surface-7',
						)}>
						<PlusIcon
							className="h-5 w-5"
							aria-hidden="true"
						/>
						<span className={'text-surface-11'}>Create a new task</span>
					</motion.button>
				)}
				{isFocused && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={
							'flex flex-col gap-2 items-start bg-white p-4 rounded-xl shadow'
						}>
						<CreateTaskForm toggle={toggle} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const CreateTaskForm = (props: { toggle: () => void }) => {
	const [, forceRerender] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();

	const form = useFormik({
		initialValues: {
			title: '',
		},
		onSubmit: (values) => {
			onSubmit(values);
		},
	});

	const onSubmit = (data) => {
		if (!data.title) return;

		const task: SnackTask = {
			id: generateUUID(),
			title: data.title,
			description: '',
			complete: false,
			priority: SnackTaskPriority.High,
			status: SnackTaskStatus.InProgress,
			createdAt: new Date(),
			lastUpdated: new Date(),
			tags: [],
			subtasks: [],
		};

		dispatch(addTask(task));
		form.resetForm();
	};

	const enterKeyListener = useCallback(
		(evt: KeyboardEvent) => {
			if (evt.key === 'Enter' && !evt.shiftKey) {
				evt.preventDefault();
				evt.stopPropagation();
				evt.cancelBubble = true;
				evt.stopImmediatePropagation();
				// trigger submit
				form.submitForm().then(props.toggle);
			}
		},
		[textAreaRef.current, form, onSubmit],
	);

	// Effects
	useClickOutside(ref, () => {
		form.submitForm().then(props.toggle);
	});

	return (
		<form
			className="w-full"
			onSubmit={form.handleSubmit}>
			<div
				ref={ref}
				className={'flex-1 flex items-start w-full mb-1'}>
				<input
					type={'checkbox'}
					disabled
					className={'!bg-surface-6 flex-shrink-0'}
				/>
				<Textarea
					placeholder={'Create a new task'}
					className={
						'outline-none ring-0 flex-1 text-surface-12 w-full font-medium'
					}
					name={'title'}
					autoFocus
					listeners={{
						keydown: enterKeyListener,
					}}
					onChange={form.handleChange}
					value={form.values.title}
				/>
			</div>

			<div className={'flex items-center gap-2'}>
				<button
					type={'button'}
					className={
						'p-2 rounded-xl bg-surface-2 hover:bg-danger-3 hover:text-danger-11 items-center text-surface-10'
					}>
					<ClockIcon className={'h-6 w-6'} />
					Deadline
				</button>
				<button
					type={'button'}
					className={
						'p-2 rounded-xl bg-surface-2 hover:bg-accent-3 hover:text-accent-11 text-surface-10'
					}>
					<LinkIcon className={'h-6 w-6'} />
					Add link
				</button>
			</div>
		</form>
	);
};

export default CreateTask;
