import TimerIcon from '../../../../assets/icons/Timer';
import { TimerButtonProps } from '../../types';
import ClientTimer from '../../ClientTimer';
import { StopIcon } from '@heroicons/react/20/solid';
import {
	CloudArrowDownIcon,
	PauseIcon,
	PlayIcon,
} from '@heroicons/react/24/solid';
import {
	TimeServiceActionEnum,
	TimeServiceConfig,
	useTimeService,
	useTimeServiceMachine,
} from '../../hooks/useTimeService';

export default function StartTimerButton(props: TimerButtonProps) {
	const timer = new ClientTimer();
	const { readLogs } = useTimeService();

	const readAllLogs = () => {
		readLogs().then((value) => {
			console.table({ value });
		});
	};

	const onPause = () => {
		console.log('PAUSE');
		readAllLogs();
	};
	const onRun = () => {
		console.log('RUNNING');
		readAllLogs();
	};
	const onIdle = () => {
		console.log('IDLE');
		readAllLogs();
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

	return (
		<>
			{timeServiceState.nextEvents.includes(TimeServiceActionEnum.START) && (
				<button
					onClick={startTimer}
					className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
					<TimerIcon className={'w-5 h-5'} />
					Start timer
				</button>
			)}
			{timeServiceState.nextEvents.includes(TimeServiceActionEnum.STOP) && (
				<button
					onClick={stopTimer}
					className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
					<StopIcon className={'w-5 h-5'} />
					Stop timer
				</button>
			)}
			{timeServiceState.nextEvents.includes(TimeServiceActionEnum.PAUSE) && (
				<button
					onClick={pauseTimer}
					className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
					<PauseIcon className={'w-5 h-5'} />
					Pause
				</button>
			)}
			{timeServiceState.nextEvents.includes(TimeServiceActionEnum.CONTINUE) && (
				<button
					onClick={continueTimer}
					className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
					<PlayIcon className={'w-5 h-5'} />
					Continue
				</button>
			)}
			<button
				onClick={readAllLogs}
				className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
				<CloudArrowDownIcon className={'w-5 h-5'} />
				Get log
			</button>
		</>
	);
}
