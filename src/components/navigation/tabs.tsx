import InboxIcon from '../../icons/InboxIcon';
import { NavItem as NavItemType } from './types';
import TargetIcon from '../../icons/TargetIcon';
import MaybeLaterIcon from '../../icons/MaybeLaterIcon';
import {
	BookOpenIcon,
	CalendarDaysIcon,
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
		icon: <BookOpenIcon className="w-5 h-5 text-primary-10" />,
		value: 'later',
		label: 'Logbook',
		href: '/logbook',
	},
];

export default tabs;