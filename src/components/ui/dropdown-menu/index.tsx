import React from 'react';

import { MouseEvent, ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { ZINDEX } from '../../../constants/styles';
import { cn } from '../../../lib/utils';

const Dropdown = (props: {
	children: ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) => {
	const dropdownOverrides = {
		open: props.open,
		onOpenChange: (open: boolean) => props.onOpenChange(open),
	};

	return (
		<DropdownMenu.Root {...(props.onOpenChange && { ...dropdownOverrides })}>
			{props.children}
		</DropdownMenu.Root>
	);
};

const DropdownTrigger = (props: { children: ReactNode; className?: string }) => {
	return <DropdownMenu.Trigger className={props.className}>{props.children}</DropdownMenu.Trigger>;
};

const DropdownContent = (props: { children: ReactNode }) => {
	return (
		<DropdownMenu.Content
			className="bg-surface-12 rounded-2xl p-1 shadow-2xl min-w-[16rem] relative"
			style={{ zIndex: ZINDEX.DROPDOWN }}>
			{props.children}
		</DropdownMenu.Content>
	);
};

const DropdownItem = ({
	children,
	className,
	onClick,
}: {
	children: ReactNode;
	shortcut?: string;
	className?: string;
	onClick?: (e?: any) => void;
}) => {
	return (
		<DropdownMenu.Item
			className={cn(
				'p-2 !rounded-xl hover:bg-white hover:bg-opacity-10 focus:outline-none focus:bg-white focus:bg-opacity-10 text-white flex items-center gap-4 font-semibold',
				className
			)}
			onClick={onClick}>
			{children}
		</DropdownMenu.Item>
	);
};

const DropdownSeparator = () => {
	return <DropdownMenu.Separator />;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export default Dropdown;
