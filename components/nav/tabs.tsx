import {
	CheckCircleIcon,
	DocumentIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import InProgressIcon from '../../icons/InProgressIcon';
import InboxIcon from '../../icons/InboxIcon';
import { NavItem as NavItemType } from './types';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-5 h-5 text-surface-12" />,
		value: 'inbox',
		label: 'Home',
		href: '/home',
	},
	{
		icon: <InProgressIcon className="w-5 h-5 text-surface-12" />,
		value: 'in-progress',
		label: 'In Progress',
		href: '/in-progress',
	},
	{
		icon: <CheckCircleIcon className="w-5 h-5 text-surface-12" />,
		value: 'notes',
		label: 'Complete',
		href: '/complete',
	},
	{
		icon: <XCircleIcon className="w-5 h-5 text-surface-12" />,

		value: 'blocked',
		label: 'Blocked',
		href: '/trash',
	},
];

export default tabs;
