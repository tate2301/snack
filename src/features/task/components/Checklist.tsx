import { SnackTask } from '../../../redux/tasks/types';
import { generateUUID } from '../../../lib/functions';
import { useAppDispatch } from '../../../redux/store';
import { addSubtask, deleteSubtask, updateSubtask } from '../../../redux/tasks';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import SFSymbol from '../../../assets/icons/SFSymbol';
import {
	useKeyboardListeners,
	useKeyboardShortcuts,
} from '../../../context/KeyboardNavigationContext';
import { stopAllPropagation } from '../../../lib/utils';
import Textarea from '../../../components/ui/input/textarea';

const TaskChecklist = (props: SnackTask) => {
	const dispatch = useAppDispatch();

	const onAddChecklist = () => {
		onAddNewItem();
	};

	const onChange = (data) => {
		dispatch(
			updateSubtask({
				...data,
				taskId: props.id,
			}),
		);
	};

	const onAddNewItem = () => {
		dispatch(
			addSubtask({
				id: props.id,
				subtask: {
					id: generateUUID(),
					title: '',
					complete: false,
				},
			}),
		);
	};

	const onDelete = (id: string) => {
		dispatch(
			deleteSubtask({
				id: props.id,
				subtaskId: id,
			}),
		);
	};

	const newItemListener = useCallback(
		(evt: KeyboardEvent) => {
			if (evt.metaKey && evt.shiftKey) {
				stopAllPropagation(evt);
				console.log(props.subtasks);
				if (props.subtasks.length !== 0) {
					if (!!props.subtasks[props.subtasks.length - 1].title) onAddNewItem();
					return;
				}

				if (props.subtasks.length === 0) {
					onAddNewItem();
					return;
				}
			}
		},
		[props.subtasks],
	);

	const listeners = useMemo(
		() => [{ key: 't', callback: newItemListener }],
		[newItemListener],
	);

	useKeyboardShortcuts(listeners);

	return (
		<div className={'py-2 border-t border-alternateSurface'}>
			{props.subtasks?.length === 0 && (
				<div>
					<button
						onClick={onAddChecklist}
						className="px-0 py-1 pr-4 rounded-lg font-semibold transition-all">
						<SFSymbol
							name="plus.square.fill.on.square.fill"
							color={'#808080'}
						/>
						Add checklist item
					</button>
				</div>
			)}
			{props.subtasks?.length !== 0 && (
				<div className="flex flex-col gap-2">
					{props.subtasks?.map((subtask) => (
						<SubTaskItem
							key={subtask.id}
							title={subtask.title}
							id={subtask.id}
							complete={subtask.complete}
							onChange={onChange}
							onDelete={onDelete}
							onNewLine={onAddNewItem}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export const SubTaskItem = (props: {
	title: string;
	complete: boolean;
	id: string;
	onChange: (task) => void;
	onDelete: (id) => void;
	onNewLine: () => void;
}) => {
	const ref = useRef<HTMLTextAreaElement>(null);

	const keydownListener = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Backspace' && !props.title) {
				props.onDelete(props.id);
			}

			if (event.key === 'Enter' && !event.shiftKey) {
				props.onNewLine();
				event.preventDefault();
				event.stopPropagation();
			}
		},
		[props.title, ref.current],
	);

	useEffect(() => {
		if (ref.current) {
			ref.current.addEventListener('keydown', keydownListener);
		}

		return () => ref.current?.removeEventListener('keydown', keydownListener);
	}, [ref.current, keydownListener]);

	return (
		<div className="flex items-center gap-2">
			<input
				className="!rounded-full !h-5 !w-5 flex-shrink-0"
				type="checkbox"
				checked={props.complete}
				onChange={(e) =>
					props.onChange({
						...props,
						complete: e.target.checked,
					})
				}
			/>
			<Textarea
				className="font-normal text-surface-12 outline-none flex-1 bg-transparent"
				value={props.title}
				placeholder="Task title"
				name="subtask-title"
				autoFocus
				setRef={ref}
				onChange={(e) => {
					props.onChange({
						...props,
						title: e.target.value,
					});
				}}
			/>
		</div>
	);
};

export default TaskChecklist;
