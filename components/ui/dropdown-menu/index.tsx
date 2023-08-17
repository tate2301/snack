import { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { ZINDEX } from '../../../constants/styles';

const Dropdown = (props: { children: ReactNode }) => {
	return <DropdownMenu.Root>{props.children}</DropdownMenu.Root>;
};

const DropdownTrigger = (props: { children: ReactNode }) => {
	return <DropdownMenu.Trigger>{props.children}</DropdownMenu.Trigger>;
};

const DropdownContent = (props: { children: ReactNode }) => {
	return (
		<DropdownMenu.Content
			className="bg-surface-12 rounded-2xl p-1 shadow-xl min-w-[16rem]"
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
	onClick?: () => void;
}) => {
	return (
		<DropdownMenu.Item
			className={clsx(
				'p-2 rounded-xl hover:bg-white hover:bg-opacity-10 focus:outline-none focus:bg-white focus:bg-opacity-10 text-white flex items-center gap-4 font-semibold',
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
