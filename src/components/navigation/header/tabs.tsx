import { NavItem as NavItemType } from '../types';
import SFSymbol from '../../../assets/icons/SFSymbol';
import { iconColors } from '../../../styles/constants';

const tabs: NavItemType[] = [
	{
		icon: (
			<SFSymbol
				color={iconColors.primary}
				name={'sun.max'}
				className="w-6 h-6 text-primary-11"
			/>
		),
		value: 'today',
		label: 'Today',
		href: '/today',
		shortcut: 'T',
	},
	{
		icon: (
			<SFSymbol
				color={iconColors.primary}
				name={'checkmark.circle.fill'}
				className="w-6 h-6 text-primary-11"
			/>
		),
		value: 'inbox',
		label: 'Inbox',
		href: '/home',
		shortcut: 'A',
	},
	{
		icon: (
			<SFSymbol
				color={iconColors.primary}
				name={'calendar.badge.clock'}
				className="w-6 h-6 text-primary-11"
			/>
		),
		value: 'future',
		label: 'Upcoming',
		href: '/future',
		shortcut: 'U',
	},
	{
		icon: (
			<SFSymbol
				color={iconColors.primary}
				name={'clock.badge.xmark'}
				className="w-6 h-6 text-primary-11"
			/>
		),
		value: 'backlog',
		label: 'Backlog',
		href: '/silenced',
		shortcut: 'B',
	},
	{
		icon: (
			<SFSymbol
				color={iconColors.primary}
				name={'person'}
				className="w-6 h-6 text-primary-11"
			/>
		),
		value: 'personal',
		label: 'Personal',
		href: '/list/default',
		shortcut: 'P',
	},
	{
		icon: (
			<SFSymbol
				color={iconColors.primary}
				name={'briefcase'}
				className="w-6 h-6 text-primary-11"
			/>
		),
		value: 'work',
		label: 'Work',
		href: '/list/work',
		shortcut: 'W',
	},
];

export default tabs;
