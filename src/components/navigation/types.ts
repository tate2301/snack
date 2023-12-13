import { ReactNode } from 'react';

export type SidebarToggleProps = {
	isExpanded: boolean;
	toggle: () => void;
	expand?: (v: boolean) => void;
};

export type Tab = string;

export type NavItem = {
	icon: ReactNode;
	value: Tab;
	label: string;
	href?: string;
	shortcut: string;
};

export type AppNavigation = {};
