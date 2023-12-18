import TimerIcon from '../../assets/icons/Timer';
import { TimerButtonProps } from './types';
import ClientTimer from './ClientTimer';
import { PauseCircleIcon, StopIcon } from '@heroicons/react/20/solid';
import {
	CloudArrowDownIcon,
	PauseIcon,
	PlayIcon,
	PlusIcon,
} from '@heroicons/react/24/solid';
import {
	TimeServiceActionEnum,
	TimeServiceConfig,
	useTimeService,
	useTimeServiceMachine,
} from './hooks/useTimeService';
import { cn } from '../../lib/utils';
import {
	ContinueTimer,
	PauseTimer,
	StartTimer,
	StopTimer,
} from './components/TimerButtons';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
import TimeServiceContext from './context';
import { ipcRenderer } from 'electron';
import ArrowsExpand from '../../assets/icons/ArrowsExpand';
import ExternalLink from '../../assets/icons/ExternalLink';
import CircleProgress from '../../components/ui/progress/CircleProgress';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { format, startOfToday } from 'date-fns';
import SFSymbol from '../../assets/icons/SFSymbol';
import { iconColors } from '../../styles/constants';
import DefaultTimeTracker from './components/DefaultTimeTracker';
import { Simulate } from 'react-dom/test-utils';
import reset = Simulate.reset;
import QuickTimeTracker from './components/QuickTimeTracker';

export const buttonVariants = {
	hidden: { opacity: 0, x: -50, height: 0 },
	visible: { opacity: 1, x: 0, height: 'auto' },
	exit: { opacity: 0, x: 50, height: 0 },
};

export default function TimeTracker(props: TimerButtonProps) {
	const timer = new ClientTimer();
	const { time: ticker, start, stop } = useContext(TimeServiceContext);
	const { readLogs } = useTimeService();

	const readAllLogs = () => {
		readLogs().then((value) => {
			console.table({ value });
		});
	};

	const onPause = () => {
		readAllLogs();
	};
	const onRun = () => {
		readAllLogs();
		start();
	};
	const onIdle = () => {
		readAllLogs();
		stop();
	};

	const timeServiceMachineConfig: TimeServiceConfig = {
		initial: 'IDLE',
		states: {
			IDLE: {
				on: {
					START: 'RUNNING',
				},
				entry: onIdle,
			},
			RUNNING: {
				on: {
					STOP: 'IDLE',
					PAUSE: 'PAUSED',
				},
				entry: onRun,
			},
			PAUSED: {
				on: {
					CONTINUE: 'RUNNING',
					STOP: 'IDLE',
				},
				entry: onPause,
			},
		},
	};

	const [timeServiceState, send] = useTimeServiceMachine(
		timeServiceMachineConfig,
	);

	const startTimer = () => {
		timer.start();
		send(TimeServiceActionEnum.START);
	};

	const stopTimer = () => {
		timer.stop();
		send(TimeServiceActionEnum.STOP);
	};

	const pauseTimer = () => {
		timer.break();
		send(TimeServiceActionEnum.PAUSE);
	};

	const continueTimer = () => {
		timer.continue();
		send(TimeServiceActionEnum.CONTINUE);
	};

	const isRunning = !timeServiceState.nextEvents.includes(
		TimeServiceActionEnum.START,
	);

	// TODO: Get notification from main process when we enter the idle part and pause the UI
	if (props.variant === 'compact')
		return (
			<QuickTimeTracker
				timeServiceState={timeServiceState}
				ticker={ticker}
				startTimer={startTimer}
				pauseTimer={pauseTimer}
				continueTimer={continueTimer}
				resetTimer={stopTimer}
				isRunning={isRunning}
			/>
		);

	return (
		<>
			<DefaultTimeTracker
				timeServiceState={timeServiceState}
				ticker={ticker}
				startTimer={startTimer}
				pauseTimer={pauseTimer}
				continueTimer={continueTimer}
				resetTimer={stopTimer}
				isRunning={isRunning}
			/>
		</>
	);
}
