import { ReactNode } from 'react';

export type SidebarToggleProps = {
	isExpanded: boolean;
	toggle: () => void;
	expand?: (v: boolean) => void;
};

export type Tab =
	| 'inbox'
	| 'calendar'
	| 'timers'
	| 'settings'
	| 'contacts'
	| 'later'
	| 'trash'
	| 'today'
	| 'notes';

export type NavItem = {
	icon: ReactNode;
	value: Tab;
	label: string;
	href?: string;
};

export type AppNavigation = {
	activeTab: Tab;
	setActiveTab: (tab: Tab) => void;
};
