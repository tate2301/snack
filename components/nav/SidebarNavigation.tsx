import {
	HashtagIcon,
	Cog6ToothIcon,
	CloudIcon,
	InboxIcon,
	ListBulletIcon,
} from '@heroicons/react/24/outline';
import TimerIcon from '../../icons/Timer';
import CalendarIcon from '../../icons/CalendarIcon';
import CollapseSidebarIcon from '../../icons/CollapseSidebarIcon';
import useToggle from '../../hooks/useToggle';
import ExpandSidebarIcon from '../../icons/ExpandSidebarIcon';
import { AppNavigation, NavItem, SidebarToggleProps, Tab } from './types';
import SidebarContainer from './SidebarContainer';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import TaskList from '../Home/TaskList';
import { UserAccount } from '../UserAccount';

const tabs: NavItem[] = [
	{
		icon: <InboxIcon className="w-6 h-6" />,
		value: 'inbox',
		label: 'Inbox',
	},
	// {
	// 	icon: <CalendarIcon className="w-6 h-6" />,
	// 	value: 'calendar',
	// 	label: 'Calendar',
	// },
	// {
	// 	icon: <TimerIcon className="w-6 h-6" />,
	// 	value: 'timers',
	// 	label: 'Timers',
	// },
];

function SidebarToggle({ isExpanded, toggle }: SidebarToggleProps) {
	return (
		<button
			onClick={toggle}
			className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400">
			{isExpanded ? (
				<CollapseSidebarIcon className="w-6 h-6" />
			) : (
				<ExpandSidebarIcon className="w-6 h-6" />
			)}
		</button>
	);
}

function SidebarNavigation(props: AppNavigation & SidebarToggleProps) {
	return (
		<div className="sticky flex flex-col items-center justify-between flex-shrink-0 h-full gap-4 bg-stone-100">
			<div className="flex flex-col gap-4">
				<div className="mx-auto mb-8">
					<SidebarToggle {...props} />
				</div>
				<div className="flex flex-col gap-4 p-2">
					{tabs.map((tab: NavItem) => (
						<NavItem
							key={tab.value}
							{...tab}
							active={props.activeTab === tab.value}
							callback={props.setActiveTab}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-4 p-2">
				<UserAccount />
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

	useEffect(() => {
		setActiveTab('inbox');
	}, []);

	return (
		<div className={'overflow-y-auto h-full bg-white z-10 flex-grow-0 flex'}>
			<SidebarNavigation
				isExpanded={isExpanded}
				toggle={toggle}
				expand={expand}
				setActiveTab={setActiveTab}
				activeTab={query.active}
			/>
			<SidebarContainer
				isExpanded={isExpanded}
				toggle={toggle}
				expand={expand}
				activeTab={query.active}
				setActiveTab={setActiveTab}
			/>
		</div>
	);
}

function NavItem(
	props: NavItem & {
		active?: boolean;
		callback: (v: Tab) => void;
	},
) {
	const onClick = () => props.callback(props.value);

	return (
		<button
			onClick={onClick}
			className={clsx(
				'p-2 transition-all rounded-xl',
				props.active
					? 'bg-zinc-900 text-white'
					: 'hover:bg-stone-100 text-zinc-400',
			)}>
			{props.icon}
		</button>
	);
}
