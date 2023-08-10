import { InboxIcon, PlusIcon } from '@heroicons/react/24/outline';
import TimerIcon from '../../icons/Timer';
import CalendarIcon from '../../icons/CalendarIcon';
import useToggle from '../../hooks/useToggle';
import {
	AppNavigation,
	NavItem as NavItemType,
	SidebarToggleProps,
	Tab,
} from './types';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { UserAccount } from '../UserAccount';
import CalendarPreview from '../calendar/CalendarPreview';
import { MinusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import ArrowsExpand from '../../icons/ArrowsExpand';

const tabs: NavItemType[] = [
	{
		icon: <CalendarIcon className="w-6 h-6" />,
		value: 'calendar',
		label: 'Calendar',
	},
	{
		icon: <InboxIcon className="w-6 h-6" />,
		value: 'inbox',
		label: 'Inbox',
	},
	{
		icon: <TimerIcon className="w-6 h-6" />,
		value: 'timers',
		label: 'Timers',
	},
];

function SidebarNavigation(props: AppNavigation & SidebarToggleProps) {
	return (
		<div className="sticky flex flex-col justify-between gap-4 p-2">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 p-2">
					<UserAccount />
				</div>
				<div className="flex flex-col w-full gap-1 p-2">
					{tabs.map((tab: NavItemType) => (
						<NavItem
							key={tab.value}
							{...tab}
							active={props.activeTab === tab.value}
							callback={props.setActiveTab}
						/>
					))}
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

	useEffect(() => {
		setActiveTab('calendar');
	}, []);

	return (
		<div
			className={
				'overflow-y-auto justify-between h-full w-[24rem] z-10 flex-grow-0 flex flex-col border-r'
			}>
			<div>
				<div className="flex items-center justify-between flex-shrink-0 w-full h-12 px-2">
					<nav className="flex items-center flex-1 h-full gap-2 px-2">
						<p className="font-semibold uppercase">Snack</p>
						<p className="px-2 py-0.5 bg-warning-10 text-white text-sm font-semibold uppercase rounded-lg ">
							DEV
						</p>
					</nav>
					<div className="flex gap-1">
						<button className="p-2 rounded hover:bg-surface-1">
							<MinusIcon className="w-6 h-6" />
						</button>
						<button className="p-2 px-3 rounded hover:bg-surface-1">
							<ArrowsExpand className="w-5 h-5" />
						</button>
						<button className="p-2 rounded hover:bg-surface-1">
							<XMarkIcon className="w-6 h-6" />
						</button>
					</div>
				</div>
				<SidebarNavigation
					isExpanded={isExpanded}
					toggle={toggle}
					expand={expand}
					setActiveTab={setActiveTab}
					activeTab={query.active}
				/>
				<div className="h-0.5 m-4 bg-opacity-10 rounded bg-zinc-900"></div>
				<div className="flex flex-col gap-2 mx-4">
					<button className="items-center w-full gap-4 p-4 hover:bg-zinc-900 hover:bg-opacity-10 rounded-xl">
						<PlusIcon className="w-5 h-5" />
						New Calendar
					</button>
					<div className="flex flex-col">
						<button className="flex items-center gap-4 p-4 hover:bg-zinc-900 hover:bg-opacity-10 rounded-xl">
							<div className="flex items-center justify-center h-8 bg-white rounded-lg aspect-square">
								<p className="text-sm uppercase text-danger-11">PE</p>
							</div>
							<p className="text-md">Product Engineering Team</p>
						</button>
						<button className="flex items-center gap-4 p-4 hover:bg-zinc-900 hover:bg-opacity-10 rounded-xl">
							<div className="flex items-center justify-center h-8 rounded-lg bg-primary-10 aspect-square">
								<p className="text-sm text-white uppercase">PE</p>
							</div>
							<p className="text-md">Personal</p>
						</button>
					</div>
				</div>
			</div>
			<div className="p-4 m-4 bg-white rounded-xl">
				<CalendarPreview />
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
	const onClick = () => props.callback(props.value);

	return (
		<button
			onClick={onClick}
			className={clsx(
				'p-4 pr-4 gap-4 transition-all rounded-xl items-center font-medium',
				props.active
					? 'text-surface-12 font-semibold bg-surface-1 shadow'
					: 'hover:bg-zinc-900 hover:bg-opacity-10',
			)}>
			{props.icon}
			{props.label}
		</button>
	);
}
