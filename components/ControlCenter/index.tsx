import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ExpandSidebarIcon from '../../icons/ExpandSidebarIcon';
import {
	BellIcon,
	Cog6ToothIcon,
	QuestionMarkCircleIcon,
	UserIcon,
} from '@heroicons/react/24/solid';

const ControlCenter = () => {
	return (
		<div className="px-2 py-4">
			<div className="flex justify-between gap-16">
				<button className="p-2 rounded-xl hover:bg-surface-4">
					<UserIcon className="w-6 h-6" />
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
		</div>
	);
};

export { ControlCenter as UserAccount };
