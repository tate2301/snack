import TimerIcon from '../../../../assets/icons/Timer';
import { TimerButtonProps } from '../../types';
import ClientTimer from '../../ClientTimer';
import { useEffect, useState } from 'react';
import { StopIcon } from '@heroicons/react/20/solid';
import { CloudArrowDownIcon } from '@heroicons/react/24/solid';

export default function StartTimerButton(props: TimerButtonProps) {
	const timer = new ClientTimer();
	const [running, setRunning] = useState<boolean>();

	const onClick = () => {
		if (running) {
			timer.pause();
			setRunning(false);
		} else {
			timer.start();
			setRunning(true);
		}
	};

	return (
		<>
			{!running && (
				<button
					onClick={onClick}
					className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
					<TimerIcon className={'w-5 h-5'} />
					Start timer
				</button>
			)}
			{running && (
				<button
					onClick={onClick}
					className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
					<StopIcon className={'w-5 h-5'} />
					Stop timer
				</button>
			)}
			<button
				onClick={() => timer.getTime()}
				className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
				<CloudArrowDownIcon className={'w-5 h-5'} />
				Get log
			</button>
		</>
	);
}
