import useToggle from '../../hooks/useToggle';
import {
	AppNavigation,
	NavItem as NavItemType,
	SidebarToggleProps,
	Tab,
} from './types';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import ExclusionTab from '../Tabs/ExlusionTab';
import Link from 'next/link';
import { useAppSelector } from '../../redux/store';
import { selectAllLists as selectAllLists } from '../../redux/lists';
import { UserAccount } from '../ControlCenter';
import { AnimatePresence } from 'framer-motion';
import tabs from './tabs';
import ListNavigationItem from '../Lists/ListNavigationItem';
import ManageListForm, {
	ManageListFormAction,
} from '../Lists/forms/CreateList';

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
							callback={props.setActiveTab}
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
	const router = useRouter();
	const [isExpanded, toggle, expand] = useToggle(true);
	const _query = useMemo(() => router.query, [router]);

	const query = {
		active: _query.activeTab as Tab,
	};

	const setActiveTab = useCallback(
		(tab: Tab) => {
			router.query.activeTab = tab;
			router.push(router);
			expand(true);
		},
		[router],
	);

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
					setActiveTab={setActiveTab}
					activeTab={query.active}
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
	const router = useRouter();
	const isActive = props.active || router.asPath === props.href;
	return (
		<Link
			href={
				props.href
					? props.href
					: {
							query: {
								activeTab: props.value,
							},
					  }
			}
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
