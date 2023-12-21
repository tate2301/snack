import { Dispatch, useEffect, useState } from 'react';
import SessionTimerActions from '../SessionTimer';
import { MachineState, TimeServiceActionEnum } from './useTimeService';
import { ipcRenderer } from 'electron';
import { isEqual, startOfDay, startOfToday } from 'date-fns';

const useTrackSession = (
	timer: SessionTimerActions,
	timeServiceState: MachineState,
	timeServiceDispatch: Dispatch<string>,
) => {
	const [sessionTicker, setTime] = useState<number | null>(0);
	const [totalToday, setTotalToday] = useState<number | null>(0);

	const [date, setDate] = useState<Date | null>(null);

	const isActive = !timeServiceState.nextEvents.includes(
		TimeServiceActionEnum.START,
	);

	const start = () => {
		timer.start();
	};

	const stop = () => {
		timer.stop();
	};

	const pause = () => {
		// TODO: return this to record pause instead of stop. You need to update the main process to log time recorded on pause
		timer.break();
	};

	const continueTimer = () => {
		timer.continue();
	};

	const reset = () => {
		timer.reset();
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

		ipcRenderer.invoke('request-total-today').then((ticker) => {
			if (!ticker && ticker !== 0) {
				setTotalToday(null);
				return;
			}

			setTotalToday(ticker);
		});
	};

	/**
	 * Get the current date being tracked by the timer service
	 */
	const getDate = () => {
		if (!date || !isEqual(startOfDay(date), startOfToday())) {
			ipcRenderer.invoke('request-date').then((date) => {
				setDate(new Date(date));
			});
		}
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
		totalToday,
		isActive,
		start,
		stop,
		pause,
		reset,
		continueTimer,
	};
};

export default useTrackSession;
