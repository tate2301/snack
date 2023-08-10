import {
	ArrowRightIcon,
	ArrowUturnRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	InboxIcon,
	PlusIcon,
	VideoCameraIcon,
} from '@heroicons/react/24/outline';
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
import ExternalLink from '../../icons/ExternalLink';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-6 h-6" />,
		value: 'inbox',
		label: 'Streams',
	},
	{
		icon: <InboxIcon className="w-6 h-6" />,
		value: 'calendar',
		label: 'In Focus',
	},
	{
		icon: <InboxIcon className="w-6 h-6" />,
		value: 'calendar',
		label: 'Maybe later',
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
		setActiveTab('inbox');
	}, []);

	return (
		<div
			className={
				'overflow-y-auto justify-between h-full w-[24rem] flex-shrink-0 z-10 flex-grow-0 flex flex-col border-r'
			}>
			<div>
				<SidebarNavigation
					isExpanded={isExpanded}
					toggle={toggle}
					expand={expand}
					setActiveTab={setActiveTab}
					activeTab={query.active}
				/>
				<div className="h-px my-4 rounded bg-opacity-10 bg-zinc-900"></div>
				<div className="flex flex-col gap-2 mx-4">
					<div className="flex flex-col">
						<button className="flex items-center gap-4 p-2 font-medium hover:bg-zinc-900 hover:bg-opacity-10 rounded-xl">
							<div className="flex items-center justify-center h-8 bg-white rounded-lg aspect-square">
								<p className="uppercase text-danger-11">⚒️</p>
							</div>
							<p className="text-md">Product Engineering Team</p>
						</button>
						<button className="flex items-center gap-4 p-2 font-medium hover:bg-zinc-900 hover:bg-opacity-10 rounded-xl">
							<div className="flex items-center justify-center h-8 rounded-lg bg-primary-2 aspect-square">
								<p className="text-white uppercase">🧑🏽‍🦱</p>
							</div>
							<p className="text-md">Personal</p>
						</button>
						<button className="flex items-center gap-4 p-2 font-medium hover:bg-zinc-900 hover:bg-opacity-10 rounded-xl">
							<div className="flex items-center justify-center h-8 rounded-lg bg-warning-1 aspect-square">
								<p className="text-white uppercase">💃🏽</p>
							</div>
							<p className="text-md">Weeked Party Animal</p>
						</button>
					</div>
					<button className="items-center w-full gap-4 p-4 hover:bg-zinc-900 hover:bg-opacity-10 rounded-xl">
						<PlusIcon className="w-5 h-5" />
						New Calendar
					</button>
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
				'p-4 pr-4 gap-4 transition-all font-semibold rounded-xl items-center',
				props.active
					? 'text-surface-12 bg-surface-1 shadow'
					: 'hover:bg-zinc-900 hover:bg-opacity-10',
			)}>
			{props.icon}
			{props.label}
		</button>
	);
}
