import {
	Cog6ToothIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import AppLogo from '../../assets/app-logo.png';

const ControlCenter = () => {
	return (
		<div className="px-2 py-4">
			<div className="flex items-center justify-between gap-16">
				<button className="rounded-xl">
					<img
						src={AppLogo}
						alt="Logo"
						height={32}
						width={32}
					/>
				</button>
				<div className="flex gap-2">
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
