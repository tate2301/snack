import InboxIcon from '../../icons/InboxIcon';
import { NavItem as NavItemType } from './types';
import TargetIcon from '../../icons/TargetIcon';
import MaybeLaterIcon from '../../icons/MaybeLaterIcon';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-5 h-5 text-surface-10" />,
		value: 'inbox',
		label: 'Inbox',
		href: '/home',
	},
	{
		icon: <TargetIcon className="w-5 h-5 text-surface-10" />,
		value: 'notes',
		label: 'My work',
		href: '/complete',
	},
	{
		icon: <MaybeLaterIcon className="w-5 h-5 text-surface-10" />,
		value: 'blocked',
		label: 'Backlog',
		href: '/trash',
	},
];

export default tabs;
