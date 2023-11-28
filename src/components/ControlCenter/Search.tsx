import {  MagnifyingGlassIcon, PauseIcon } from '@heroicons/react/24/solid';
import { cn } from '../../lib/utils';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import ExternalLink from '../../icons/ExternalLink';
import ClockInButton from '../../features/time-tracking/components/StartTimerButton/ClockInButton';

const ControlCentre = () => {
	return (
		<div className={"flex items-center space-x-4"}>
			<ClockInButton />
			<button className="font-normal flex relative p-1.5 hover:bg-surface-4 hover:text-surface-12 rounded-lg">
				<MagnifyingGlassIcon className="w-5 h-5" />
			</button>
		</div>
	);
};



export default ControlCentre;
