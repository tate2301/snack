import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
	addSubtask,
	deleteSubtask,
	deleteTask,
	updateSubtask,
	updateTask,
} from '../../../redux/tasks';
import {
	SnackSubtask,
	SnackTask,
	SnackTaskStatus,
} from '../../../redux/tasks/types';
import {
	addTaskToList,
	selectListByTaskId,
	removeTaskFromList,
} from '../../../redux/lists';
import { toast } from 'sonner';
import { useNavigate, useNavigation } from 'react-router-dom';

const useTaskFunctions = (task: SnackTask) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const openInPage = () => navigate(`/task/${task.id}`);

	const list = useAppSelector(selectListByTaskId(task.id));

	const onUpdateTask = (task: SnackTask) => {
		dispatch(updateTask(task));
	};

	const changeStatus = useCallback(
		(status: SnackTaskStatus) => {
			dispatch(
				updateTask({
					...task,
					status,
					complete: status === SnackTaskStatus.Complete,
				}),
			);

			if (status === SnackTaskStatus.Complete) {
				toast('Hurray! Task has been completed.', {
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

	const onTitleChange = (e) => {
		const value = e.target.value;
		onUpdateTask({
			...task,
			title: value,
		});
	};

	const onDeadlineChanged = (date: Date) => {
		onUpdateTask({
			...task,
			deadline: date,
		});
	};

	const onDeleteTask = useCallback(() => {
		deleteTask({
			id: task.id,
		});
	}, [task]);

	return {
		changeStatus,
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
		list,
	};
};

export default useTaskFunctions;
