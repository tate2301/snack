import { SnackTask } from '../../../redux/tasks/types';
import Textarea from '../../../components/ui/input/textarea';
import Modal from '../../../components/ui/modal';
import useTaskFunctions from './hooks/useTaskFunctions';
import SnackTooltip, {
	TooltipContent,
	TooltipTrigger,
} from '../../../components/ui/tooltip';
import ProjectList from '../../../components/forms/select/ProjectsList';
import AddDeadline from '../../../components/forms/Deadline';
import { parseISO } from 'date-fns';
import { useEffect, useRef } from 'react';
import SFSymbol from '../../../assets/icons/SFSymbol';
import TaskChecklist from './Checklist';
import TaskStatus from './Status';

type TaskExpandedViewProps = {
	isOpen: boolean;
	onClose: () => void;
} & SnackTask;

const TaskExpandedView = (props: TaskExpandedViewProps) => {
	const {
		onStatusChange,
		onUpdateTask,
		changeList,
		openInPage,
		list,
		onDeadlineChanged,
		onTitleChange,
		onDescriptionChange,
	} = useTaskFunctions(props);

	const titleRef = useRef(props.title);

	const handleOnClose = () => {
		console.log(titleRef);
		if (props.title === '') onTitleChange(null, titleRef.current);
		props.onClose();
	};

	useEffect(() => {
		if (!titleRef.current) titleRef.current = props.title;
	}, [props.title]);

	return (
		<Modal
			noPadding
			isOpen={props.isOpen}
			onClose={handleOnClose}>
			<div className="w-full text-base font-normal text-surface-11 max-h-[60vh] overflow-y-auto overflow-x-visible">
				<div className="z-30 sticky top-0 bg-white rounded-2xl">
					<div className="flex justify-between p-2 border-b border-surface-4">
						<div className="flex items-start gap-4">
							<p className="rounded-xl">
								<TaskStatus
									status={props.status}
									onChange={onStatusChange}
								/>
							</p>
							{false && (
								<p className="rounded-xl">
									<ProjectList
										defaultListId={list.id}
										onChange={changeList}
									/>
								</p>
							)}
						</div>
						<SnackTooltip>
							<TooltipTrigger>
								<button
									onClick={handleOnClose}
									className="rounded-xl p-0">
									<SFSymbol
										name="xmark.circle.fill"
										color={'#404040'}
									/>
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Close</p>
							</TooltipContent>
						</SnackTooltip>
					</div>
				</div>

				<div className="p-2">
					<Textarea
						name={'title'}
						onChange={onTitleChange}
						value={props.title}
						className="p-2 text-xl w-full outline-none ring-0 font-semibold text-surface-12 my-0"
					/>
					<Textarea
						value={props.description}
						onChange={onDescriptionChange}
						name={'description'}
						placeholder="Add a description"
						className={
							'outline-none ring-0 flex-1 text-surface-10 w-full font-semibold p-2 my-0'
						}
					/>
				</div>
				<div className="flex items-center gap-2 p-4">
					<p className="rounded-xl bg-surface-4">
						<AddDeadline
							selectDate={onDeadlineChanged}
							selectedDate={
								typeof props.deadline === 'string'
									? parseISO(props.deadline)
									: props.deadline
							}
						/>
					</p>
				</div>

				<div className="p-4">
					<TaskChecklist {...props} />
				</div>
			</div>
		</Modal>
	);
};

export default TaskExpandedView;
