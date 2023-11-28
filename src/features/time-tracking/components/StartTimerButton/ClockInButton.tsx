import { startOfToday } from 'date-fns';
import useToggle from '../../../../lib/hooks/useToggle';
import { PlayIcon, StopIcon } from '@heroicons/react/20/solid';
import { cn } from '../../../../lib/utils';
import { useEffect, useState } from 'react';
import { setInterval } from 'timers';
import { CurrencyDollarIcon, EllipsisHorizontalIcon, PauseIcon } from '@heroicons/react/24/solid';
import ExternalLink from '../../../../assets/icons/ExternalLink';

export default function ClockInButton() {
	const today = startOfToday();
	const [isRunning, toggle] = useToggle(false);
	const [isBillingEnabled, setIsBillingEnabled] = useState(false)
	const [session, setSession] = useState<{
		link?: string
	}>({})
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
			<div
				className={cn(
					'rounded-lg flex space-x-2 text-sm transition-all',
					isRunning ? 'bg-danger-10 text-white py-1' : 'bg-surface-12 py-1 text-white',
				)}>
				{!isRunning && (
					<button className={"text-white px-2 py-0"} onClick={toggle}>
						<PlayIcon className={'w-5 h-5'} />
						{seconds > 0 ? "Continue session" : "Clock in"}
					</button>
				)}
				{isRunning && (
					<p className={"text-white py-0 flex items-center gap-2 font-medium"}>
						<button onClick={toggle} className={"p-1 text-white"}>
							<PauseIcon className="w-4 h-4" />
						</button>

						<span>
							{hours}hr {minutes}min
						</span>

						<span className={"flex items-center gap-1"}>
							{isBillingEnabled && <CurrencyDollarIcon className={"w-5 h-5"} />}
						</span>

						<button className={"text-white pr-2 p-0"}>
							<EllipsisHorizontalIcon className={"w-5 h-5"} />
						</button>
					</p>
				)}
			</div>
		</div>
	);
}
