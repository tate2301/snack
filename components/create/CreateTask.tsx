import useToggle from '../../hooks/useToggle';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowUpIcon,
	HashtagIcon,
	LinkIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Textarea from '../ui/input/textarea';
import { useAppDispatch } from '../../redux/store';
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
import SelectList from './SelectList';
import { addTaskToList } from '../../redux/lists';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import Kbd from '../ui/typography/Kbd';
import useDisclosure from '../../hooks/useDisclosure';

const CreateTask = () => {
	const ref = useRef<HTMLButtonElement>(null);
	const [isFocused, toggle, setIsFocused] = useToggle(false);

	useEffect(() => {
		if (ref.current) {
			const evtListener = (evt: KeyboardEvent) => {
				// Listen for Ctrl + Enter
				if (evt.key === 'Enter' && evt.ctrlKey) {
					evt.preventDefault();
					evt.stopPropagation();
					evt.cancelBubble = true;
					evt.stopImmediatePropagation();
					toggle();
				}
			};

			ref.current.addEventListener('keydown', evtListener);

			return () => {
				ref.current?.removeEventListener('keydown', evtListener);
			};
		}
	}, [ref.current]);

	return (
		<div className={'group'}>
			<AnimatePresence>
				{!isFocused && (
					<motion.button
						ref={ref}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						type="button"
						onClick={toggle}
						className={clsx(
							'relative flex items-center font-normal bg-surface-6 rounded-xl w-full p-4 hover:bg-surface-7',
						)}>
						<PlusIcon
							className="w-5 h-5"
							aria-hidden="true"
						/>
						<span className={'text-surface-11'}>Create a new task</span>
						<Kbd keys={['Ctrl', 'Enter']} />
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
	const { isOpen: hasDescriptionField, onOpen: addDescriptionField } =
		useDisclosure();
	const [, forceRerender] = useState(0);
	const formRef = useRef<HTMLFormElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();

	const form = useFormik({
		initialValues: {
			title: '',
			deadline: undefined,
			list: 'default',
			description: '',
		},
		onSubmit: (values) => {
			onSubmit(values);
		},
	});

	const onSubmit = (data: typeof form.values) => {
		if (!data.title) return;

		const task: SnackTask = {
			id: generateUUID(),
			title: data.title,
			description: data.description,
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
		dispatch(addTaskToList({ listId: data.list, taskId: task.id }));
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

	const shiftEnterKey = useCallback(
		(evt: KeyboardEvent) => {
			if (evt.key === 'Enter' && evt.shiftKey) {
				evt.preventDefault();
				evt.stopPropagation();
				evt.cancelBubble = true;
				evt.stopImmediatePropagation();
				// trigger submit
				addDescriptionField();
			}
		},
		[textAreaRef.current, form],
	);

	useEffect(() => {
		if (formRef.current) {
			const closeFormListener = (evt: KeyboardEvent) => {
				if (evt.key === 'Escape') props.toggle();
			};

			formRef.current.addEventListener('keydown', closeFormListener);

			return () => {
				formRef.current?.removeEventListener('keydown', closeFormListener);
			};
		}
	}, []);

	// // Effects
	// useClickOutside(ref, () => {
	// 	form.submitForm().then(props.toggle);
	// });

	return (
		<form
			className="w-full"
			ref={formRef}
			onSubmit={form.handleSubmit}>
			<div className={'flex-1 flex items-start w-full mb-1'}>
				<input
					type={'checkbox'}
					disabled
					className={'!bg-surface-6 flex-shrink-0'}
				/>
				<div className="flex-1">
					<Textarea
						rows={1}
						placeholder={'Create a new task'}
						className={
							'outline-none ring-0 text-surface-12 w-full font-medium h-fit'
						}
						name={'title'}
						autoFocus
						listeners={{
							keydown: [enterKeyListener, shiftEnterKey],
						}}
						onChange={form.handleChange}
						value={form.values.title}
					/>
					{hasDescriptionField && (
						<Textarea
							placeholder="Additional notes"
							name={'description'}
							className={
								'outline-none ring-0 flex-1 text-surface-10 w-full font-medium'
							}
							autoFocus
							onChange={form.handleChange}
							value={form.values.description}
						/>
					)}
				</div>
			</div>

			<div className={'flex items-center justify-between gap-2'}>
				<div className="flex gap-2">
					<SelectList
						defaultListId={form.values.list}
						onChange={(val) => form.setFieldValue('list', val)}
					/>
					<AddDeadline
						selectDate={(date) => form.setFieldValue('deadline', date)}
						selectedDate={form.values.deadline}
					/>
					<button
						className="p-2 rounded-xl hover:bg-surface-3"
						type={'button'}>
						<HashtagIcon className={'w-5 h-5'} />
					</button>
				</div>
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
				<div className="flex gap-4">
					<button
						type={'button'}
						onClick={props.toggle}
						className={'p-2 px-4 rounded-xl text-surface-10'}>
						Cancel
						<Kbd keys={['Esc']} />
					</button>
					<button
						type={'submit'}
						className={'p-2 px-4 rounded-xl bg-primary-10 text-white'}>
						<p className="p-1 bg-white rounded-full">
							<ArrowUpIcon className="w-4 h-4 stroke-2 text-primary-11" />
						</p>
						Add task
						<Kbd keys={['Enter']} />
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreateTask;

function AddDeadline(props: {
	selectDate: (date: Date) => void;
	selectedDate?: Date;
}) {
	const [isOpen, toggle, setIsOpen] = useToggle(false);
	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<Popover.Trigger>
				<button
					type={'button'}
					className={clsx(
						'p-2 rounded-xl items-center flex-shrink-0',
						props.selectedDate
							? 'bg-primary-4 text-primary-11 border-primary-6'
							: 'bg-white border-surface-4 hover:bg-danger-3 hover:text-danger-11 hover:border-danger-6 text-surface-10',
					)}>
					<CalendarDaysIcon className="w-6 h-6" />
					{props.selectedDate
						? format(props.selectedDate, 'dd MMM yyyy')
						: null}
				</button>
			</Popover.Trigger>
			<Popover.Content>
				<div className="p-2">
					<Datepicker
						value={props.selectedDate ?? startOfToday()}
						onChange={(date) => {
							props.selectDate(date);
							toggle();
						}}
					/>
				</div>
			</Popover.Content>
		</Popover>
	);
}
