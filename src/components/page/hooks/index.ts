import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useKeyboardListeners } from '../../../context/KeyboardNavigationContext';
import { SnackTask } from '../../../redux/tasks/types';

export const useTaskPageLayoutNavigation = (
	groupedTasks: {
		[key: string]: SnackTask[];
	},
	selectedTask: string | null,
	setSelectedTask: (id: string) => void,
) => {
	const [siblings, setSiblings] = useState([null, null]);
	const { registerListeners, unregisterListeners } = useKeyboardListeners();
	const groups = useMemo(() => Object.keys(groupedTasks), [groupedTasks]);

	const resolveGroup = (id: string) => {
		return Object.keys(groupedTasks).find((key) =>
			groupedTasks[key].some((task) => task.id === id),
		);
	};

	const onNext = () => {
		if (siblings[1]) {
			setSelectedTask(siblings[1]);
		} else {
			const currentGroupIndex = groups.indexOf(resolveGroup(selectedTask));
			if (currentGroupIndex < groups.length - 1) {
				const nextGroup = groups[currentGroupIndex + 1];
				const nextId = groupedTasks[nextGroup][0].id;
				setSelectedTask(nextId);
			}
		}
	};

	const onPrev = () => {
		if (siblings[0]) {
			setSelectedTask(siblings[0]);
		} else {
			const currentGroupIndex = groups.indexOf(resolveGroup(selectedTask));
			if (currentGroupIndex > 0) {
				const prevGroup = groups[currentGroupIndex - 1];
				const prevId =
					groupedTasks[prevGroup][groupedTasks[prevGroup].length - 1].id;
				setSelectedTask(prevId);
			}
		}
	};

	const onNextCallback = useCallback(
		(event: KeyboardEvent) => {
			onNext();
		},
		[siblings], // Added siblings to dependencies
	);

	const onPrevCallback = useCallback(
		(event: KeyboardEvent) => {
			onPrev();
		},
		[siblings], // Added siblings to dependencies
	);

	const listeners = useMemo(
		() => [
			{
				key: 'ArrowDown',
				callback: onNextCallback,
			},
			{
				key: 'ArrowUp',
				callback: onPrevCallback,
			},
		],
		[onNextCallback, onPrevCallback],
	);

	useEffect(() => {
		if (selectedTask) {
			registerListeners(listeners);
			return () => unregisterListeners(listeners); // Unregister listeners on cleanup
		}
	}, [selectedTask, listeners, registerListeners]);

	useEffect(() => {
		if (selectedTask) {
			const group = resolveGroup(selectedTask);
			if (group) {
				const tasksInGroup = groupedTasks[group];
				const index = tasksInGroup.findIndex(
					(task) => task.id === selectedTask,
				);
				const prevIndex = index > 0 ? index - 1 : -1;
				const nextIndex = index < tasksInGroup.length - 1 ? index + 1 : -1;
				const prevId = prevIndex !== -1 ? tasksInGroup[prevIndex].id : null;
				const nextId = nextIndex !== -1 ? tasksInGroup[nextIndex].id : null;

				setSiblings([prevId, nextId]);
			}
		}
	}, [selectedTask]);
};
