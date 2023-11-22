import { startOfToday } from 'date-fns';
import TimerIcon from '../../../../icons/Timer';
import { TimerButtonProps } from '../../types';
import useToggle from '../../../../hooks/useToggle';
import { PlayIcon, StopIcon } from '@heroicons/react/20/solid';
import { cn } from '../../../../lib/utils';

export default function ClockInButton() {
	const today = startOfToday();
	const [isRunning, toggle] = useToggle(false);

	return (
		<div className="flex space-x-2 items-center">
			<p className="text-surface-10">00:00:00</p>
			<button
				className={cn(
					'p-2 rounded-lg flex space-x-2 text-sm',
					isRunning ? 'bg-warning-10 text-white' : 'bg-accent-10 text-white',
				)}>
				{!isRunning && <PlayIcon className={'w-5 h-5'} />}
				{isRunning && <StopIcon className={'w-5 h-5'} />}
				Clock in
			</button>
		</div>
	);
}
