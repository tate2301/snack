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
import ProjectList from '../misc/lists/ProjectsList';
import { addTaskToList } from '../../redux/lists';
import Kbd from '../ui/typography/Kbd';
import useDisclosure from '../../hooks/useDisclosure';
import TagInput from '../ui/input/TagInput';
import AddDeadline from './task/AddDeadline';
import { cn } from '../../lib/utils';
import EmojiPicker from './EmojiPicker';

const CreateTask = (props: {
	defaultList?: string;
	overrideOpenState?: boolean;
	overrideToggle?: () => void;
}) => {
	const ref = useRef<HTMLButtonElement>(null);
	const [isFocused, toggle, setIsFocused] = useToggle(props.overrideOpenState);

	const toggleWithCb = () => {
		toggle();
		if (props.overrideToggle) props.overrideToggle();
	};

	useEffect(() => {
		if (ref.current) {
			const evtListener = (evt: KeyboardEvent) => {
				// Listen for Ctrl + Enter
				if (evt.key === 'Enter' && evt.ctrlKey) {
					evt.preventDefault();
					evt.stopPropagation();
					evt.cancelBubble = true;
					evt.stopImmediatePropagation();
					toggleWithCb();
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
						<span className={'text-surface-11'}>Add task</span>
					</motion.button>
				)}
				{isFocused && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={cn(
							'flex flex-col gap-2 items-start',
							!props.overrideOpenState && 'bg-white p-4 rounded-xl shadow',
						)}>
						<CreateTaskForm
							toggle={toggleWithCb}
							defaultList={props.defaultList}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const CreateTaskForm = (props: {
	toggle: () => void;
	defaultList?: string;
}) => {
	const {
		isOpen: hasDescriptionField,
		onOpen: addDescriptionField,
		onClose: removeDescriptionField,
	} = useDisclosure();
	const { isOpen: hasTags, onOpen: addTagsField } = useDisclosure();
	const [, forceRerender] = useState(0);
	const formRef = useRef<HTMLFormElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();

	const form = useFormik({
		initialValues: {
			title: '',
			deadline: undefined,
			list: props.defaultList || 'default',
			description: '',
			tags: [],
			emoji: '',
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
			priority: SnackTaskPriority.Default,
			status: SnackTaskStatus.Todo,
			createdAt: new Date(),
			lastUpdated: new Date(),
			tags: data.tags,
			subtasks: [],
			deadline: data.deadline,
			emoji: data.emoji,
		};

		dispatch(addTask(task));
		dispatch(addTaskToList({ listId: data.list, taskId: task.id }));
		form.resetForm();
		props.toggle();
	};

	const stopAllPropagation = (evt: KeyboardEvent) => {
		evt.preventDefault();
		evt.stopPropagation();
		evt.cancelBubble = true;
		evt.stopImmediatePropagation();
	};

	const enterKeyListener = useCallback(
		(evt: KeyboardEvent) => {
			// If user presses enter in title field, lets submit the form
			if (evt.key === 'Enter' && !evt.shiftKey) {
				stopAllPropagation(evt);
				form.submitForm().then(props.toggle);
			}
		},
		[textAreaRef.current, form, onSubmit],
	);

	const titleShiftEnterKeyListener = useCallback(
		(evt: KeyboardEvent) => {
			// If user presses shift + enter in title field, lets add a description field
			if (evt.key === 'Enter' && evt.shiftKey) {
				stopAllPropagation(evt);
				addDescriptionField();
			}
		},
		[textAreaRef.current, form],
	);

	const backspaceDescriptionListener = useCallback(
		(evt: KeyboardEvent) => {
			// If user presses backspace in description field and its already empty, lets remove the field
			if (evt.key === 'Backspace' && descriptionRef.current?.value === '') {
				stopAllPropagation(evt);
				// Focus back on title field
				removeDescriptionField();
				textAreaRef.current.focus();
			}
		},
		[descriptionRef.current, textAreaRef.current, form],
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
			className="flex flex-col w-full gap-2"
			ref={formRef}
			onSubmit={form.handleSubmit}>
			<div className="flex mb-2 w-fit border border-surfacce-3 rounded-xl">
				<ProjectList
					defaultListId={form.values.list}
					onChange={(val) => form.setFieldValue('list', val)}
				/>
			</div>
			<div className={'flex-1 flex items-start w-full mb-1 gap-4'}>
				<EmojiPicker onChange={(emoji) => form.setFieldValue('emoji', emoji)} />

				<div className="flex-1">
					<Textarea
						setRef={textAreaRef}
						rows={1}
						placeholder={'Create a new task'}
						className={
							'outline-none ring-0 text-surface-12 w-full font-semibold h-fit'
						}
						name={'title'}
						autoFocus
						listeners={{
							keydown: [enterKeyListener, titleShiftEnterKeyListener],
						}}
						onChange={form.handleChange}
						value={form.values.title}
					/>
					{hasDescriptionField && (
						<Textarea
							setRef={descriptionRef}
							placeholder="Additional notes"
							name={'description'}
							className={
								'outline-none ring-0 flex-1 text-surface-10 w-full font-semibold'
							}
							autoFocus
							onChange={form.handleChange}
							value={form.values.description}
							listeners={{
								keydown: [backspaceDescriptionListener],
							}}
						/>
					)}
				</div>
			</div>

			<div className={'flex items-center justify-between gap-2 mt-2'}>
				<div className="flex gap-2">
					<AddDeadline
						selectDate={(date) => form.setFieldValue('deadline', date)}
						selectedDate={form.values.deadline}
					/>
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
