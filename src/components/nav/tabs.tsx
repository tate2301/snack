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
import TargetIcon from '../../icons/TargetIcon';
import MaybeLaterIcon from '../../icons/MaybeLaterIcon';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-5 h-5 text-surface-11" />,
		value: 'inbox',
		label: 'Home',
		href: '/home',
	},
	{
		icon: <TargetIcon className="w-6 h-6 text-surface-11" />,
		value: 'notes',
		label: 'My work',
		href: '/complete',
	},
	{
		icon: <MaybeLaterIcon className="w-6 h-6 text-surface-11" />,
		value: 'blocked',
		label: 'Backlog',
		href: '/trash',
	},
];

export default tabs;
