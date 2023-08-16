import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ExpandSidebarIcon from '../../icons/ExpandSidebarIcon';
import {
	BellIcon,
	Cog6ToothIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';

const ControlCenter = () => {
	return (
		<div className="py-4 px-2">
			<div className="flex gap-16 mb-4 justify-between">
				<button className="p-2 rounded-xl hover:bg-surface-4">
					<ExpandSidebarIcon className="w-6 h-6" />
				</button>
				<div className="flex gap-2">
					<button className="p-2 rounded-xl hover:bg-surface-4">
						<BellIcon className="w-6 h-6" />
					</button>
					<button className="p-2 rounded-xl hover:bg-surface-4">
						<Cog6ToothIcon className="w-6 h-6" />
					</button>
					<button className="p-2 rounded-xl hover:bg-surface-4">
						<QuestionMarkCircleIcon className="w-6 h-6" />
					</button>
				</div>
			</div>
			<button className="flex items-center w-full h-16 gap-4 text-left hover:bg-white rounded-xl p-2">
				<p className="h-10 w-10 bg-surface-12 flex justify-center items-center text-white rounded-xl font-bold text-xl">
					T
				</p>
				<p className="font-semibold text-surface-12">Tatenda Chinyamakobvu</p>
			</button>
		</div>
	);
};

export { ControlCenter as UserAccount };
