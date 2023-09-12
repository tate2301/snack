import React from 'react';

import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';

const Settings = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<button className="p-2 rounded-xl hover:bg-surface-4">
					<Cog6ToothIcon className="w-6 h-6" />
				</button>
			</DialogTrigger>
			<DialogContent>
				<div>
					<DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
					<DialogDescription>
						Configure your global preferences here.
					</DialogDescription>
				</div>
				<div></div>
			</DialogContent>
		</Dialog>
	);
};

export default Settings;
