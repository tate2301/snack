import { useEffect, useState } from 'react';
import useTrackSession from './useTrackSession';
import { clone } from 'lodash';

const useTaskQueue = (
	sessionTracker: ReturnType<typeof useTrackSession>,
	isActive?: boolean,
) => {
	const [taskQueue, setTaskQueue] = useState([]);
	const [taskBeingCurrentlyTracked, setTaskBeingCurrentlyTracked] = useState<
		string | null
	>();
	const [taskQueueTickers, setTaskQueueTickers] = useState<Map<string, number>>(
		new Map(),
	);

	const addTaskToQueue = (id: string) => {
		setTaskQueue([...taskQueue, id]);
	};

	const removeTaskFromQueue = (id: string) => {
		const newQueue = [...taskQueue.filter((item) => item !== id)];
		setTaskQueue(newQueue);
		if (newQueue.length === 0 && isActive) {
			sessionTracker.reset();
			return;
		}
	};

	const startTrackingTask = (id: string) => {
		setTaskBeingCurrentlyTracked(id);
		sessionTracker.start();

		setTaskQueueTickers((map) => {
			if (!map.get(id)) {
				map.set(id, 0);
			}
			return map;
		});
	};

	const stopTrackingTask = () => {
		// TODO: record the current ticker for the task here
		removeTaskFromQueue(taskBeingCurrentlyTracked);
		if (taskQueue.length === 0) {
			setImmediate(() => {
				sessionTracker.reset();
			});
			return;
		}

		setTaskQueueTickers((map) => {
			map.set(taskBeingCurrentlyTracked, sessionTracker.sessionTicker);
			return map;
		});
		setTaskBeingCurrentlyTracked(null);

		sessionTracker.stop();
	};

	const completeTaskAndContinueToNextTaskInQueue = (id: string) => {
		// TODO: if enabled, pressing a hotkey should mark current task as complete and move you to the next item
		removeTaskFromQueue(id);
		startTrackingTask(taskQueue[0]);
	};

	const discardAllTasksInQueue = () => {
		setTaskQueue([]);
		stopTrackingTask();
	};

	// we need to actually record the time for each task in here
	const getTimeTrackedForTask = (id: string) => {
		return taskQueueTickers.get(id);
	};

	useEffect(() => {
		if (!taskBeingCurrentlyTracked && taskQueue.length > 0) {
			startTrackingTask(taskQueue[0]);
		}
	}, [taskQueue, taskBeingCurrentlyTracked, isActive]);

	useEffect(() => {
		if (taskBeingCurrentlyTracked) {
			setTaskQueueTickers((map) => {
				map.set(taskBeingCurrentlyTracked, sessionTracker.sessionTicker);
				return map;
			});
		}
	}, [sessionTracker.sessionTicker, taskBeingCurrentlyTracked]);

	return {
		tasks: taskQueue,
		taskBeingCurrentlyTracked,
		addTaskToQueue,
		completeTaskAndContinueToNextTaskInQueue,
		removeTaskFromQueue,
		startTrackingTask,
		stopTrackingTask,
		discardAllTasksInQueue,
		getTimeTrackedForTask,
		sessionTicker: 0,
	};
};

export default useTaskQueue;
