import { createContext, Dispatch, FC, ReactNode, useContext } from 'react';
import {
	MachineState,
	TimeServiceActionEnum,
	TimeServiceConfig,
	useTimeServiceMachine,
} from '../hooks/useTimeService';
import SessionTimerActions from '../SessionTimer';
import BreakTimeOverlay from '../components/BreakTimeOverlay';
import useTaskQueue from '../hooks/useTaskQueue';
import useTrackSession from '../hooks/useTrackSession';

export type TaskQueue = ReturnType<typeof useTaskQueue>;
export type SessionManager = ReturnType<typeof useTrackSession>;

export type TimeServiceActions = ReturnType<typeof useTimeServiceActions>;

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
	taskQueue?: TaskQueue;
	sessionManager?: SessionManager;
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

export const TimeServiceProvider: FC<{ children: ReactNode }> = (props) => {
	const timeServiceMachineConfig: TimeServiceConfig = {
		initial: 'IDLE',
		states: {
			IDLE: {
				on: {
					START: 'RUNNING',
				},
				entry: () => null,
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
				entry: () => null,
			},
		},
	};

	const [timeServiceState, send] = useTimeServiceMachine(
		timeServiceMachineConfig,
	);

	const sessionTimer = new SessionTimerActions(send);

	const sessionManager = useTrackSession(sessionTimer, timeServiceState, send);
	const taskQueue = useTaskQueue(sessionManager, sessionManager.isActive);

	const {
		sessionTicker,
		totalToday,
		isActive,
		start,
		stop,
		pause,
		continueTimer,
	} = sessionManager;

	const { startTrackingTask, stopTrackingTask, tasks, getTimeTrackedForTask } =
		taskQueue;

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
				taskQueue,
				sessionManager,
			}}>
			{timeServiceState.nextEvents.includes(TimeServiceActionEnum.CONTINUE) && (
				<BreakTimeOverlay />
			)}
			{props.children}
		</TimeServiceContext.Provider>
	);
};

export const useTimeServiceActions = () => {
	const {
		getTimeTrackedForTask: getTimeForTask,
		startTrackingTask,
		stopTrackingTask,
		tasks,
		totalToday,
		time,
		timeServiceState,
		continueTimer,
		taskQueue,
		sessionManager,
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
		continueTimer,
		taskQueue,
		sessionManager,
	};
};

export default TimeServiceContext;
