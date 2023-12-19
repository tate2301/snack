import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { ipcRenderer } from 'electron';
import {
	MachineState,
	TimeServiceActionEnum,
	TimeServiceConfig,
	TimeServiceState,
	useTimeServiceMachine,
} from '../hooks/useTimeService';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
	logBreak,
	logIdle,
	logTrackedTime,
	selectDay,
	startNewDay,
	stopTrackingAllTasks,
} from '../../../redux/time-service';
import { isEqual, startOfDay } from 'date-fns';
import ClientTimer from '../ClientTimer';
import useToggle from '../../../lib/hooks/useToggle';

const TimeServiceContext = createContext<{
	time: number;
	start: () => void;
	stop: () => void;
	pause: () => void;
	continueTimer: () => void;
	isActive: boolean;
	send: Dispatch<string>;
	totalToday: number;
	timeServiceState: MachineState | null;
	tasks: Array<string>;
	startTrackingTask: (id: string) => void;
	stopTrackingTask: (id: string) => void;
	getTimeTrackedForTask: (id: string) => number;
}>({
	time: 0,
	totalToday: 0,
	start: () => null,
	stop: () => null,
	pause: () => null,
	continueTimer: () => null,
	isActive: false,
	send: (action) => null,
	tasks: [],
	startTrackingTask: (id: string) => null,
	stopTrackingTask: (id: string) => null,
	getTimeTrackedForTask: (id: string) => 0,
	timeServiceState: null,
});

export const useTimeServiceActions = () => {
	const {
		getTimeTrackedForTask: getTimeForTask,
		startTrackingTask,
		stopTrackingTask,
		tasks,
		totalToday,
		time,
		timeServiceState,
	} = useContext(TimeServiceContext);

	return {
		getTimeForTask,
		startTrackingTask,
		stopTrackingTask,
		tasks,
		totalToday,
		time,
		timeServiceState,
		isRunning: timeServiceState.nextEvents.includes(
			TimeServiceActionEnum.PAUSE,
		),
	};
};

const useTaskQueue = (timer: ClientTimer) => {
	const [taskQueue, setTaskQueue] = useState([]);
	const [taskBeingCurrentlyTracked, setTaskBeingCurrentlyTracked] = useState<
		string | null
	>();
	const [autoContinue, toggleAutoContinue] = useToggle(true);
	const addTaskToQueue = (id: string) => {
		setTaskQueue([...taskQueue, id]);
	};

	const removeTaskFromQueue = (id: string) => {
		setTaskQueue([...taskQueue.filter((item) => item !== id)]);
	};

	const startTrackingTask = (id: string) => {
		setTaskQueue([...taskQueue, id]);
	};

	const stopTrackingTask = (id: string) => {
		setTaskQueue([...taskQueue.filter((item) => item !== id)]);
	};

	const completeCurrentAndContinueToNextTaskInQueue = (id: string) => {
		// TODO: if enabled, pressing a hotkey should mark current task as complete and move you to the next item
		setTaskQueue([...taskQueue.filter((item) => item !== id)]);
	};

	const discardAllTasksInQueue = (id: string) => {
		setTaskQueue([...taskQueue.filter((item) => item !== id)]);
	};

	const getTimeTrackedForTask = (id: string) => {
		return 0;
	};

	return {
		tasks: taskQueue,
		addTaskToQueue,
		removeTaskFromQueue,
		startTrackingTask,
		stopTrackingTask,
		discardAllTasksInQueue,
		toggleAutoContinue,
		getTimeTrackedForTask,
	};
};

const useTrackSession = (
	timer: ClientTimer,
	timeServiceState: MachineState,
	timeServiceDispatch: Dispatch<string>,
) => {
	const [sessionTicker, setTime] = useState<number | null>(0);
	const [date, setDate] = useState<Date | null>(null);

	const totalTimeTrackedToday = useMemo(() => sessionTicker, [sessionTicker]);
	const isActive = !timeServiceState.nextEvents.includes(
		TimeServiceActionEnum.START,
	);

	/**
	 * If the timer is already active, i.e, we are already tracking something,
	 * lets restart the timer in a new session. Otherwise start a session with no specific
	 * tasks being tracked.
	 */
	const startSessionWithoutTask = () => {
		if (isActive) {
			stopSession();
		}

		timeServiceDispatch(TimeServiceActionEnum.START);
		timer.start();
	};

	/**
	 * Stops all sessions being tracked, even when there are tasks being tracked, it will
	 * reset the task queue.
	 */
	const stopSession = () => {
		timer.stop();
		timeServiceDispatch(TimeServiceActionEnum.STOP);
	};

	/**
	 * Get the current time from the timer service
	 */
	const getSessionTicker = () => {
		ipcRenderer.invoke('request-ticker').then((ticker) => {
			if (!ticker && ticker !== 0) {
				setTime(null);
				return;
			}

			setTime(ticker);
		});
	};

	/**
	 * Get the current date being tracked by the timer service
	 */
	const getDate = () => {
		ipcRenderer.invoke('request-date').then((date) => {
			setDate(new Date(date));
		});
	};

	useEffect(() => {
		const register = () => {
			getSessionTicker();
			getDate();
		};
		const timeout = setInterval(register, 1000);

		if (!isActive) {
			clearInterval(timeout);
		}

		return () => clearInterval(timeout);
	}, [isActive]);

	useEffect(() => {
		timer.running().then((isRunning) => {
			if (isRunning) timeServiceDispatch(TimeServiceActionEnum.START);
		});
	}, []);

	return {
		sessionTicker,
		currentDate: startOfDay(date),
		totalToday: totalTimeTrackedToday,
		isActive,
		startSessionWithoutTask,
		stopSession,
	};
};

export const TimeServiceProvider: FC<{ children: ReactNode }> = (props) => {
	const dispatch = useAppDispatch();
	const timer = new ClientTimer();

	const readLogs = async () => {
		return await ipcRenderer.invoke('request-log');
	};

	const readAllLogs = () => {};

	const timeServiceMachineConfig: TimeServiceConfig = {
		initial: 'IDLE',
		states: {
			IDLE: {
				on: {
					START: 'RUNNING',
				},
				entry: readAllLogs,
			},
			RUNNING: {
				on: {
					STOP: 'IDLE',
					PAUSE: 'PAUSED',
				},
				entry: () => null,
			},
			PAUSED: {
				on: {
					CONTINUE: 'RUNNING',
					STOP: 'IDLE',
				},
				entry: readAllLogs,
			},
		},
	};

	const [timeServiceState, send] = useTimeServiceMachine(
		timeServiceMachineConfig,
	);

	const {
		sessionTicker,
		currentDate,
		totalToday,
		isActive,
		startSessionWithoutTask,
		stopSession,
	} = useTrackSession(timer, timeServiceState, send);

	const {
		startTrackingTask,
		stopTrackingTask,
		addTaskToQueue,
		removeTaskFromQueue,
		toggleAutoContinue,
		discardAllTasksInQueue,
		tasks,
		getTimeTrackedForTask,
	} = useTaskQueue(timer);

	const start = () => {
		timer.start();
		send(TimeServiceActionEnum.START);
	};

	const stop = () => {
		timer.stop();
		send(TimeServiceActionEnum.STOP);
	};

	const pause = () => {
		// TODO: return this to record pause instead of stop. You need to update the main process to log time recorded on pause
		timer.break();
		send(TimeServiceActionEnum.PAUSE);
	};

	const continueTimer = () => {
		timer.continue();
		send(TimeServiceActionEnum.CONTINUE);
	};

	return (
		<TimeServiceContext.Provider
			value={{
				time: sessionTicker,
				totalToday,
				tasks,
				timeServiceState,
				isActive,
				send,
				start,
				stop,
				pause,
				continueTimer,
				startTrackingTask,
				stopTrackingTask,
				getTimeTrackedForTask,
			}}>
			{props.children}
		</TimeServiceContext.Provider>
	);
};

export default TimeServiceContext;
