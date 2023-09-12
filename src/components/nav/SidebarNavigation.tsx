import useToggle from '../../hooks/useToggle';
import {
	AppNavigation,
	NavItem as NavItemType,
	SidebarToggleProps,
	Tab,
} from './types';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import ExclusionTab from '../Tabs/ExlusionTab';
import { useAppSelector } from '../../redux/store';
import { selectAllLists as selectAllLists } from '../../redux/lists';
import { UserAccount } from '../ControlCenter';
import { AnimatePresence } from 'framer-motion';
import tabs from './tabs';
import ListNavigationItem from '../Lists/ListNavigationItem';
import ManageListForm, {
	ManageListFormAction,
} from '../Lists/forms/CreateList';
import SnackPluginManager from '../../lib/integrations';

function SidebarNavigation(props: AppNavigation & SidebarToggleProps) {
	return (
		<div className="sticky flex flex-col gap-4 w-96">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col w-full gap-1 p-2">
					{tabs.map((tab: NavItemType) => (
						<NavItem
							key={tab.value}
							{...tab}
							active={false}
							callback={() => {}}
							href={tab.href}
						/>
					))}
					<Lists />
				</div>
			</div>
		</div>
	);
}

export default function NavigationSidebar({}) {
	const [isExpanded, toggle, expand] = useToggle(true);
	return (
		<div
			className={
				'overflow-y-hidden justify-between h-full flex-shrink-0 flex-grow-0 flex flex-col'
			}>
			<div className="flex flex-col h-full bg-white border border-r border-surface-4">
				<div className="mb-4">
					<UserAccount />
				</div>
				<SidebarNavigation
					isExpanded={isExpanded}
					toggle={toggle}
					expand={expand}
				/>
			</div>
		</div>
	);
}

function NavItem(
	props: NavItemType & {
		active?: boolean;
		callback: (v: Tab) => void;
	},
) {
	const path = useLocation();
	const isActive = props.active || path.pathname === props.href;
	return (
		<Link
			to={props.href}
			className="hover:bg-surface-4 rounded-xl">
			<ExclusionTab
				id={'sidebar'}
				isActive={isActive}>
				<p
					className={clsx(
						'p-2 justify-between flex w-full text-surface-12 transition-all text-md font-medium rounded-xl items-center',
						props.active && '',
					)}>
					<span className="flex gap-4">
						{props.icon}
						{props.label}
					</span>
				</p>
			</ExclusionTab>
		</Link>
	);
}

function Lists({}) {
	const lists = useAppSelector(selectAllLists);
	return (
		<>
			<AnimatePresence initial={false}>
				{lists.map((list) => (
					<ListNavigationItem
						list={list}
						key={list.id}
					/>
				))}
			</AnimatePresence>
			<ManageListForm action={ManageListFormAction.Create} />
		</>
	);
}
