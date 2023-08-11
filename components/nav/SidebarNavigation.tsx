import {
	ArrowRightIcon,
	ArrowUturnRightIcon,
	BoltIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	InboxIcon,
	PlusIcon,
	Square3Stack3DIcon,
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
import { ArrowPathIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import ArrowsExpand from '../../icons/ArrowsExpand';
import ExternalLink from '../../icons/ExternalLink';
import Kbd from '../ui/typography/Kbd';
import TargetIcon from '../../icons/TargetIcon';
import MaybeLaterIcon from '../../icons/MaybeLaterIcon';
import ExclusionTab from '../Tabs/ExlusionTab';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-5 h-5 text-surface-12" />,
		value: 'settings',
		label: 'Inbox',
	},
	{
		icon: <TargetIcon className="w-5 h-5 text-surface-12" />,
		value: 'calendar',
		label: 'Active',
	},
	{
		icon: <CalendarIcon className="w-5 h-5 text-surface-12" />,
		value: 'inbox',
		label: 'Today',
	},
	{
		icon: <MaybeLaterIcon className="w-5 h-5 text-surface-12" />,
		value: 'contacts',
		label: 'Maybe later',
	},
	{
		icon: <TimerIcon className="w-5 h-5 text-surface-12" />,
		value: 'timers',
		label: 'Focus',
	},
];

function SidebarNavigation(props: AppNavigation & SidebarToggleProps) {
	return (
		<div className="sticky flex flex-col justify-between gap-4 w-96">
			<div className="flex flex-col gap-4">
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
				'overflow-y-auto justify-between h-full flex-shrink-0 flex-grow-0 flex flex-col p-2'
			}>
			<div className="bg-white bg-opacity-75 rounded-xl">
				<SidebarNavigation
					isExpanded={isExpanded}
					toggle={toggle}
					expand={expand}
					setActiveTab={setActiveTab}
					activeTab={query.active}
				/>
				<div className="flex flex-col gap-2 p-2 mt-8">
					<p className="px-4 uppercase">Calendars</p>
					<div>
						<div className="flex flex-col justify-center">
							<button className="flex items-center gap-4 p-4 font-semibold text-surface-12 rounded-xl hover:bg-surface-3">
								<p className="flex items-center w-4 gap-4 text-lg font-medium rounded-md text-md aspect-square">
									🏋🏽‍♂️
								</p>
								<p>Workout scheme</p>
							</button>
						</div>
						<div className="flex flex-col justify-center">
							<button className="flex items-center gap-4 p-4 font-semibold text-surface-12 rounded-xl hover:bg-surface-3">
								<p className="flex items-center w-4 gap-4 text-lg font-medium rounded-md aspect-square">
									🔥
								</p>
								<p>Party Animal</p>
							</button>
						</div>
					</div>
					<button className="flex items-center gap-4 p-4 hover:bg-surface-3 rounded-xl">
						<PlusIcon className="w-5 h-5" />
						<p className="flex items-center justify-between flex-1">
							<span>New calendar</span>
							<Kbd keys={['⌘', 'D']} />
						</p>
					</button>
				</div>
				<div className="flex flex-col gap-2 p-2 mt-8">
					<p className="px-4 uppercase">Lists</p>
					<div>
						<div className="flex flex-col justify-center">
							<button className="flex items-center gap-4 p-4 font-semibold text-surface-12 rounded-xl hover:bg-surface-3">
								<p className="flex items-center h-4 gap-4 font-medium rounded-md aspect-square ring-2 ring-success-9"></p>
								<p>Sideprojects</p>
							</button>
						</div>
						<div className="flex flex-col justify-center">
							<button className="flex items-center gap-4 p-4 font-semibold text-surface-12 rounded-xl hover:bg-surface-3">
								<p className="flex items-center h-4 gap-4 font-medium rounded-md aspect-square ring-2 ring-primary-10"></p>
								<p className="flex items-center justify-between flex-1">
									<span>School run</span>
									<ArrowPathIcon className="w-4 h-4" />
								</p>
							</button>
						</div>
						<div className="flex flex-col justify-center">
							<button className="flex items-center gap-4 p-4 font-semibold text-surface-12 rounded-xl hover:bg-surface-3">
								<p className="flex items-center h-4 gap-4 font-medium rounded-md aspect-square ring-2 ring-primary-10"></p>
								<p>Grocery shopping</p>
							</button>
						</div>
					</div>
					<button className="flex items-center gap-4 p-4 text-surface-11 hover:bg-surface-3 rounded-xl">
						<PlusIcon className="w-5 h-5" />
						<p className="flex items-center justify-between flex-1">
							<span>New list</span>
							<Kbd keys={['⌘', 'L']} />
						</p>
					</button>
				</div>
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
		<ExclusionTab
			id={'sidebar'}
			isActive={props.active}>
			<p
				onClick={onClick}
				className={clsx(
					'p-4 gap-4 flex w-full transition-all text-md font-semibold rounded-xl items-center',
					props.active ? 'text-surface-12' : 'text-surface-11',
				)}>
				{props.icon}
				{props.label}
			</p>
		</ExclusionTab>
	);
}
