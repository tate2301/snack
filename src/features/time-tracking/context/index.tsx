import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const TimeServiceContext = createContext<{
	time: number;
	activateSession: () => void;
	deactivateSession: () => void;
}>({
	time: 0,
	activateSession: () => null,
	deactivateSession: () => null,
});

export const TimeServiceProvider: FC<{ children: ReactNode }> = (props) => {
	const [time, setTime] = useState<number | null>(0);
	const [isActive, setIsActive] = useState(false);

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

	return (
		<TimeServiceContext.Provider
			value={{
				time,
				activateSession: () => setIsActive(true),
				deactivateSession: () => setIsActive(false),
			}}>
			{props.children}
		</TimeServiceContext.Provider>
	);
};

export default TimeServiceContext;
