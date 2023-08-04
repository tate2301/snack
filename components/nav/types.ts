import { ReactNode } from 'react';

export type SidebarToggleProps = {
	isExpanded: boolean;
	toggle: () => void;
	expand?: (v: boolean) => void;
};

export type Tab = 'inbox' | 'calendar' | 'timers' | 'settings' | 'contacts';

export type NavItem = {
	icon: ReactNode;
	value: Tab;
	label: string;
};

export type AppNavigation = {
	activeTab: Tab;
	setActiveTab: (tab: Tab) => void;
};
