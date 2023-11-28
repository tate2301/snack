import InboxIcon from '../../../assets/icons/InboxIcon';
import { NavItem as NavItemType } from '../types';
import TargetIcon from '../../../assets/icons/TargetIcon';
import MaybeLaterIcon from '../../../assets/icons/MaybeLaterIcon';
import {
	BookOpenIcon,
	CalendarDaysIcon, CalendarIcon,
	ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-5 h-5 text-primary-10" />,
		value: 'inbox',
		label: 'Inbox',
		href: '/home',
	},
	{
		icon: <CalendarDaysIcon className="w-5 h-5 text-primary-10" />,
		value: 'today',
		label: 'Today',
		href: '/today',
	},
	{
		icon: <ExclamationCircleIcon className="w-5 h-5 text-primary-10" />,
		value: 'blocked',
		label: 'Backlog',
		href: '/backlog',
	},
	{
		icon: <CalendarIcon className="w-5 h-5 text-primary-10" />,
		value: 'calendar',
		label: 'Calendar',
		href: '/components',
	},
];

export default tabs;
