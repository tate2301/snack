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
	},

	{
		icon: (
			<SFSymbol
				color={iconColors.primary}
				name={'moon'}
				className="w-6 h-6 text-primary-11"
			/>
		),
		value: 'silenced',
		label: 'Silenced',
		href: '/silenced',
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
		href: '/personal',
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
		href: '/work',
	},
];

export default tabs;
