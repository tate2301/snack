import { startOfToday } from 'date-fns';
import useToggle from '../../../../hooks/useToggle';
import { PlayIcon, StopIcon } from '@heroicons/react/20/solid';
import { cn } from '../../../../lib/utils';
import { useEffect, useState } from 'react';
import { setInterval } from 'timers';

export default function ClockInButton() {
	const today = startOfToday();
	const [isRunning, toggle] = useToggle(false);
	const [secondsFromStart, setSecondsFromStart] = useState(0);
	const [timerId, setTimerId] = useState(null);
	const hours = Math.floor(secondsFromStart / 3600);
	const minutes = Math.floor(secondsFromStart / 60);
	const seconds = secondsFromStart % 60;

	useEffect(() => {
		const countUp = () => {
			setSecondsFromStart((state) => state + 1);
		};

		if (isRunning) {
			const timeout = setTimeout(countUp, 1000);
			setTimerId(timeout);
		}

		if (!isRunning) {
			clearTimeout(timerId);
			setTimerId(undefined);
		}

		return () => clearTimeout(timerId);
	}, [isRunning, secondsFromStart]);

	return (
		<div className="flex space-x-2 items-center">
			<button
				onClick={toggle}
				className={cn(
					'p-2 rounded-lg flex space-x-2 text-sm',
					isRunning ? 'bg-danger-10 text-white' : 'bg-surface-10 text-white',
				)}>
				{!isRunning && (
					<>
						<PlayIcon className={'w-5 h-5'} />
						Clock in
					</>
				)}
				{isRunning && (
					<>
						<StopIcon className={'w-5 h-5'} />
						Clock out
					</>
				)}
			</button>
			<p
				className={cn(
					'text-surface-10 px-2 py-1 rounded-lg border font-semibold  border-transparent',
					isRunning && 'text-surface-12 border-zinc-400/30 shadow-sm',
				)}>
				{hours < 10 ? `0${hours}` : hours}:
				{minutes < 10 ? `0${minutes}` : minutes}:
				{seconds < 10 ? `0${seconds}` : seconds}
			</p>
		</div>
	);
}
