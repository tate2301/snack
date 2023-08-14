import useToggle from '../../hooks/useToggle';
import { useCallback, useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowUpIcon,
	ClockIcon,
	LinkIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';
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
import Popover from '../ui/popover';
import Datepicker from '../ui/datepicker';
import { format, startOfToday } from 'date-fns';

const CreateTask = () => {
	const [isFocused, toggle, setIsFocused] = useToggle(false);

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
						<CreateTaskForm
							toggle={toggle}
							setIsFocused={setIsFocused}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const CreateTaskForm = (props: {
	toggle: () => void;
	setIsFocused: (t: boolean) => void;
}) => {
	const [, forceRerender] = useState(0);
	const ref = useRef<HTMLFormElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();

	const form = useFormik({
		initialValues: {
			title: '',
			deadline: undefined,
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
			deadline: data.deadline,
		};

		dispatch(addTask(task));
		form.resetForm();
		props.setIsFocused(false);
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

	// // Effects
	// useClickOutside(ref, () => {
	// 	form.submitForm().then(props.toggle);
	// });

	return (
		<form
			className="w-full"
			ref={ref}
			onSubmit={form.handleSubmit}>
			<div className={'flex-1 flex items-start w-full mb-1'}>
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

			<div className={'flex items-center justify-between gap-2'}>
				<AddDeadline
					selectDate={(date) => form.setFieldValue('deadline', date)}
					selectedDate={form.values.deadline}
				/>
				{false && (
					<button
						type={'button'}
						className={
							'p-2 rounded-xl bg-surface-2 hover:bg-accent-3 hover:text-accent-11 text-surface-10'
						}>
						<LinkIcon className={'h-6 w-6'} />
						Add link
					</button>
				)}
				<button
					type={'submit'}
					className={'p-2 px-4 rounded-xl bg-primary-10 text-white'}>
					<p className="p-1 rounded-full bg-white">
						<ArrowUpIcon className="w-4 h-4 text-primary-11 stroke-2" />
					</p>
					Add task
				</button>
			</div>
		</form>
	);
};

export default CreateTask;

function AddDeadline(props: {
	selectDate: (date: Date) => void;
	selectedDate?: Date;
}) {
	return (
		<Popover>
			<Popover.Trigger>
				<button
					type={'button'}
					className={clsx(
						'p-2 rounded-xl items-center',
						props.selectedDate
							? 'bg-primary-4 text-primary-11'
							: 'bg-surface-2 hover:bg-danger-3 hover:text-danger-11 text-surface-10',
					)}>
					<ClockIcon className={'h-6 w-6'} />
					{props.selectedDate
						? format(props.selectedDate, 'EEE dd yyyy')
						: 'Deadline'}
				</button>
			</Popover.Trigger>
			<Popover.Content noClose>
				<Datepicker
					value={props.selectedDate ?? startOfToday()}
					onChange={props.selectDate}
				/>
			</Popover.Content>
		</Popover>
	);
}
