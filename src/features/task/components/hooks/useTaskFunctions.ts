import { useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
	addSubtask,
	deleteSubtask,
	deleteTask,
	pinTask,
	unpinTask,
	updateSubtask,
	updateTask,
} from '../../../../redux/tasks';
import {
	SnackSubtask,
	SnackTask,
	SnackTaskStatus,
} from '../../../../redux/tasks/types';
import {
	addTaskToList,
	selectListByTaskId,
	removeTaskFromList,
} from '../../../../redux/lists';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const useTaskFunctions = (task: SnackTask) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const openInPage = () => navigate(`/task/${task.id}`);
	const list = useAppSelector(selectListByTaskId(task.id));
	const taskRef = useRef(task);

	const onUpdateTask = (task: SnackTask) => {
		dispatch(updateTask(task));
	};

	const onStatusChange = useCallback(
		(status: SnackTaskStatus) => {
			dispatch(
				updateTask({
					...task,
					status,
				}),
			);

			if (status === SnackTaskStatus.Complete) {
				toast('Hurray! components has been completed.', {
					description: task.title,
				});
			}
		},
		[task],
	);

	const changeList = useCallback(
		(listId: string) => {
			const oldListId = list.id;

			// Remove task from old list
			dispatch(
				removeTaskFromList({
					listId: oldListId,
					taskId: task.id,
				}),
			);

			// Add task to New project
			dispatch(
				addTaskToList({
					listId,
					taskId: task.id,
				}),
			);
		},
		[task, list],
	);

	const onAddSubTask = useCallback(
		(subtask: SnackSubtask) => {
			dispatch(addSubtask(subtask));
		},
		[task],
	);

	const onToggleTaskPinned = useCallback(() => {
		if (task.pinned) {
			dispatch(unpinTask(task));
		} else {
			dispatch(pinTask(task));
		}
	}, [task]);

	const onUpdateSubTask = useCallback(
		(subtask: SnackSubtask) => {
			dispatch(
				updateSubtask({
					...subtask,
					taskId: task.id,
				}),
			);
		},
		[task],
	);

	const onRemoveSubTask = useCallback(
		(subtaskId: string) => {
			dispatch(
				deleteSubtask({
					id: task.id,
					subtaskId,
				}),
			);
		},
		[task],
	);

	const onDescriptionChange = (e) => {
		const value = e.target.value;
		onUpdateTask({
			...task,
			description: value,
		});
	};

	const onTitleChange = (e, override?) => {
		let value = e.target.value;
		if (!value) taskRef.current.title;
		onUpdateTask({
			...task,
			title: value,
		});
	};

	const onDeadlineChanged = (date: Date) => {
		onUpdateTask({
			...task,
			deadline: date,
			status:
				task.status === SnackTaskStatus.Complete
					? SnackTaskStatus.InProgress
					: task.status,
		});
	};

	const onDeleteTask = useCallback(() => {
		deleteTask({
			id: task.id,
		});
	}, [task]);

	return {
		onStatusChange,
		changeList,
		onAddSubTask,
		onUpdateSubTask,
		onRemoveSubTask,
		onUpdateTask,
		openInPage,
		onDeadlineChanged,
		onTitleChange,
		onDescriptionChange,
		onDeleteTask,
		onToggleTaskPinned,
		list,
	};
};

export default useTaskFunctions;
