import React from 'react';

import {
	CheckCircleIcon,
	DocumentIcon,
	ExclamationCircleIcon,
	XCircleIcon,
} from '@heroicons/react/24/solid';
import InProgressIcon from '../../icons/InProgressIcon';
import InboxIcon from '../../icons/InboxIcon';
import { NavItem as NavItemType } from './types';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-5 h-5 text-surface-11" />,
		value: 'inbox',
		label: 'Home',
		href: '/home',
	},
	{
		icon: <ExclamationCircleIcon className="w-6 h-6 text-surface-11" />,
		value: 'in-progress',
		label: 'Urgent',
		href: '/in-progress',
	},
	{
		icon: <CheckCircleIcon className="w-6 h-6 text-surface-11" />,
		value: 'notes',
		label: 'Complete',
		href: '/complete',
	},
	{
		icon: <XCircleIcon className="w-6 h-6 text-surface-11" />,

		value: 'blocked',
		label: 'Blocked',
		href: '/trash',
	},
];

export default tabs;
