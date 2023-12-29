import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { SnackTask, SnackTaskStatus } from '../../../../redux/tasks/types';
import { motion } from 'framer-motion';
import SFSymbol from '../../../../assets/icons/SFSymbol';
import Textarea from '../../../../components/ui/input/textarea';
import ProjectList from '../../../../components/forms/select/ProjectsList';
import useTaskFunctions from '../hooks/useTaskFunctions';
import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import Kbd, { Keys } from '../../../../components/ui/typography/Kbd';
import { stopAllPropagation } from '../../../../lib/utils';
import useDisclosure from '../../../../lib/hooks/useDisclosure';
import {
	useKeyboardListeners,
	useKeyboardShortcuts,
} from '../../../../context/KeyboardNavigationContext';
import TaskChecklist from '../Checklist';
import TaskStatus from '../Status';

type DetailedTaskListItemProps = {
	onCheck: (e) => void;
	isChecked: boolean;
	emoji?: string;
	title: string;
	complete?: boolean;
	list: {
		name: string;
		color: string;
		id: string;
	};
	deadline?: Date;
	status: SnackTaskStatus;
	subtasks: {
		complete: boolean;
	}[];
	description?: string;
	id: string;
	quickActions?: ReactNode;
};

export default function DetailedTaskListItem(
	props: DetailedTaskListItemProps & SnackTask,
) {
	const { onDescriptionChange, onTitleChange, onStatusChange } =
		useTaskFunctions(props);
	const titleRef = useRef();
	const descriptionRef = useRef<HTMLTextAreaElement>();
	const {
		isOpen: hasDescriptionField,
		onOpen: addDescriptionField,
		onClose: removeDescriptionField,
	} = useDisclosure();

	const enterKeyListener = useCallback(
		(evt: KeyboardEvent) => {
			// If user presses enter in title field, lets submit the form
			if (evt.key === 'Enter' && !evt.shiftKey) {
				descriptionRef.current?.focus();
				evt.stopImmediatePropagation();
				evt.stopPropagation();
				evt.preventDefault();
				return;
			}
		},
		[titleRef.current],
	);

	const titleShiftEnterKeyListener = useCallback((evt: KeyboardEvent) => {
		// If user presses shift + enter in title field, lets add a description field
		if (evt.metaKey) {
			stopAllPropagation(evt);
			addDescriptionField();
			return;
		}
	}, []);

	const onCheckListener = useCallback((evt: KeyboardEvent) => {
		// If user presses shift + enter in title field, lets add a description field
		if (evt.metaKey && evt.shiftKey) {
			onStatusChange(SnackTaskStatus.Complete);
			stopAllPropagation(evt);
			return;
		}
	}, []);

	const onUnCheckListener = useCallback((evt: KeyboardEvent) => {
		// If user presses shift + enter in title field, lets add a description field
		if (evt.metaKey && evt.shiftKey) {
			onStatusChange(SnackTaskStatus.InProgress);
			stopAllPropagation(evt);
			return;
		}
	}, []);

	const listeners = useMemo(
		() => [
			{ key: 'd', callback: titleShiftEnterKeyListener },
			{ key: 'Enter', callback: onCheckListener },
			{ key: 'Backspace', callback: onUnCheckListener },
		],
		[titleShiftEnterKeyListener, onCheckListener, onUnCheckListener],
	);

	useKeyboardShortcuts(listeners);

	useEffect(() => {
		if (props.description) {
			addDescriptionField();
		}
	}, [props.description]);

	return (
		<motion.div
			initial={{
				opacity: 0,
				y: '-0.75rem',
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				x: 0,
				y: '-0.75rem',
			}}
			transition={{
				type: 'tween',
				ease: 'easeInOut',
				duration: 0.3,
			}}
			className="flex items-center flex-1 h-full rounded-xl bg-white my-4 px-2 py-3">
			<div className="flex-1 h-full">
				<AnimatePresence>
					<div className="flex items-start w-full gap-2">
						<input
							className="flex-shrink-0 rounded-xl relative z-1 !mt-0.5"
							type="checkbox"
							onChange={props.onCheck}
							checked={props.status === SnackTaskStatus.Complete}
						/>

						<div className="flex-1 pr-2">
							<div className="flex items-start space-x-2 justify-between">
								<Textarea
									className={clsx(
										'line-clamp-1 pr-4 w-full max-w-screen-lg outline-none font-semibold text-surface-12',
									)}
									value={props.title}
									name={'title'}
									onChange={onTitleChange}
									listeners={{
										keydown: [enterKeyListener],
									}}
									setRef={titleRef}
									autoFocus
								/>
								{props.quickActions}
							</div>
							{!props.description && !hasDescriptionField && (
								<AnimatePresence>
									<motion.div
										initial={{ top: -10, opacity: 0 }}
										exit={{ scale: 0, opacity: 0 }}
										animate={{ top: 0, opacity: 1 }}
										className="flex items-center">
										<p className="text-surface-8">
											Press <Kbd keys={[Keys.Meta, 'd']} /> to write additional
											notes
										</p>
									</motion.div>
								</AnimatePresence>
							)}

							{hasDescriptionField && (
								<Textarea
									value={props.description}
									onChange={onDescriptionChange}
									name={'description'}
									className={
										'bg-transparent text-surface-12 max-w-screen-lg w-full outline-none mb-0'
									}
									placeholder="Additional notes"
									setRef={descriptionRef}
									autoFocus
								/>
							)}

							<div className="mt-2">
								<TaskChecklist {...props} />
							</div>

							<div className="flex justify-between items-center border-t pt-4 border-alternateSurface">
								<div className="text-sm text-surface-11 flex gap-4">
									<span className="flex items-center gap-2 rounded-lg bg-alternateSurface/10 border border-zinc-400/30 shadow-sm font-semibold">
										<ProjectList
											defaultListId={props.list.id}
											onChange={() => null}
										/>
									</span>

									{props.subtasks?.length > 0 && (
										<>
											<span className="flex gap-2 items-center rounded-lg py-1 px-2 bg-alternateSurface/10 border border-zinc-400/30 shadow-sm font-semibold text-surface-12">
												{props.subtasks.filter((s) => !s.complete).length !==
													0 && (
													<SFSymbol
														name={'checklist'}
														color={'#808080'}
													/>
												)}
												{props.subtasks.filter((s) => !s.complete).length ===
													0 && (
													<SFSymbol
														name={'checklist.checked'}
														color={'#808080'}
													/>
												)}
												<span>
													{
														props.subtasks.filter((subtask) => subtask.complete)
															.length
													}{' '}
													of {props.subtasks.length}
												</span>
											</span>
										</>
									)}
									<span className="flex items-center gap-2 rounded-lg bg-alternateSurface/10 border border-zinc-400/30 shadow-sm font-semibold">
										<TaskStatus
											onChange={onStatusChange}
											status={props.status}
										/>
									</span>
								</div>
							</div>
						</div>
					</div>
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
