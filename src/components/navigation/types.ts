import { ReactNode } from 'react';

export type SidebarToggleProps = {
	isExpanded: boolean;
	toggle: () => void;
	expand?: (v: boolean) => void;
};

export type Tab =
	| 'inbox'
	| 'timers'
	| 'settings'
	| 'tomorrow'
	| 'later'
	| 'trash'
	| "calendar"
	| 'blocked'
	| 'in-progress'
	| 'create'
	| 'today'
	| 'notes';

export type NavItem = {
	icon: ReactNode;
	value: Tab;
	label: string;
	href?: string;
};

export type AppNavigation = {};
