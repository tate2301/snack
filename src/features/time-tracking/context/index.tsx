import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { ipcRenderer } from 'electron';

const TimeServiceContext = createContext<{
	time: number;
	start: () => void;
	stop: () => void;
	totalToday: number;
	tasks: Array<string>;
	startTrackingTask: (id: string) => void;
	stopTrackingTask: (id: string) => void;
	getTimeForTask: (id: string) => number;
}>({
	time: 0,
	totalToday: 0,
	start: () => null,
	stop: () => null,
	tasks: [],
	startTrackingTask: (id: string) => null,
	stopTrackingTask: (id: string) => null,
	getTimeForTask: (id: string) => 0,
});

export const useTimeServiceActions = () => {
	const {
		getTimeForTask,
		startTrackingTask,
		stopTrackingTask,
		tasks,
		totalToday,
		time,
	} = useContext(TimeServiceContext);
};

export const TimeServiceProvider: FC<{ children: ReactNode }> = (props) => {
	const [time, setTime] = useState<number | null>(0);
	const [isActive, setIsActive] = useState(false);
	const [tasks, setTasks] = useState([]);

	const getTicker = () => {
		ipcRenderer.invoke('request-ticker').then((ticker) => {
			if (!ticker && ticker !== 0) {
				setTime(null);
				return;
			}

			setTime(ticker);
			getTicker();
		});
	};

	useEffect(() => {
		if (!isActive) return;

		const timeout = setTimeout(getTicker, 1000);
		return () => clearTimeout(timeout);
	}, [isActive]);

	const totalToday = time;

	const startTrackingTask = (id: string) => {};
	const stopTrackingTask = (id: string) => {};
	const getTimeForTask = (id: string) => {
		return time;
	};

	return (
		<TimeServiceContext.Provider
			value={{
				time,
				totalToday,
				tasks,
				start: () => setIsActive(true),
				stop: () => setIsActive(false),
				startTrackingTask,
				stopTrackingTask,
				getTimeForTask,
			}}>
			{props.children}
		</TimeServiceContext.Provider>
	);
};

export default TimeServiceContext;
