import {
	HashtagIcon,
	Cog6ToothIcon,
	CloudIcon,
	InboxIcon,
} from '@heroicons/react/24/outline';
import TimerIcon from '../../icons/Timer';
import CalendarIcon from '../../icons/CalendarIcon';
import CollapseSidebarIcon from '../../icons/CollapseSidebarIcon';
import useToggle from '../../lib/hooks/useToggle';
import ExpandSidebarIcon from '../../icons/ExpandSidebarIcon';
import { AppNavigation, NavItem, SidebarToggleProps, Tab } from './types';
import SidebarContainer from './SidebarContainer';
import { useRouter } from 'next/router';
import { ReactNode, useCallback, useMemo } from 'react';
import clsx from 'clsx';

const tabs: NavItem[] = [
	{
		icon: <InboxIcon className="w-6 h-6" />,
		value: 'inbox',
		label: 'Inbox',
	},
	{
		icon: <CalendarIcon className="w-6 h-6" />,
		value: 'calendar',
		label: 'Calendar',
	},
	{
		icon: <TimerIcon className="w-6 h-6" />,
		value: 'timers',
		label: 'Timers',
	},
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
	console.log(props.activeTab);
	return (
		<div className="sticky flex flex-col justify-between flex-shrink-0 gap-4 p-2 h-full ">
			<div className="flex flex-col gap-4">
				<SidebarToggle {...props} />
				{tabs.map((tab: NavItem) => (
					<NavItem
						key={tab.value}
						{...tab}
						active={props.activeTab === tab.value}
						callback={props.setActiveTab}
					/>
				))}
			</div>
			<div className="flex flex-col gap-4">
				<button className="p-2 rounded-xl text-zinc-400 hover:bg-zinc-100">
					<Cog6ToothIcon className="w-6 h-6" />
				</button>
				<button className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400">
					<CloudIcon className="w-6 h-6" />
				</button>
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
				'max-w-[24rem] overflow-y-auto h-full bg-white z-10 flex-grow-0 flex gap-1 divide-x'
			}>
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
				props.active ? 'bg-zinc-900 text-white' : 'hover:bg-stone-100',
			)}>
			{props.icon}
		</button>
	);
}
