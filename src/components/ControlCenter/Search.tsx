import {  MagnifyingGlassIcon, PauseIcon } from '@heroicons/react/24/solid';
import { cn } from '../../lib/utils';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import ExternalLink from '../../icons/ExternalLink';

const ControlCentre = () => {
	return (
		<div className={"flex items-center space-x-4"}>
			<TimeTracker />
			<button className="font-normal flex relative p-1.5 hover:bg-surface-4 hover:text-surface-12 rounded-lg">
				<MagnifyingGlassIcon className="w-5 h-5" />
			</button>
		</div>
	);
};

const TimeTracker = () => {
	return (
		<button className={cn('py-1 px-2 rounded-lg text-surface-10', "bg-danger-11 text-danger-1")}>
			<PauseIcon className="w-5 h-5" />

			<span>
				0hr 00min
			</span>

			<CurrencyDollarIcon className={"w-5 h-5"} />

			<ExternalLink className={"w-4 h-4"} />

		</button>
	);
};

export default ControlCentre;
