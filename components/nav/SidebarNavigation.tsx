import {
	ArrowPathIcon,
	CalendarDaysIcon,
	PlusIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import CalendarIcon from '../../icons/CalendarIcon';
import useToggle from '../../hooks/useToggle';
import {
	AppNavigation,
	NavItem as NavItemType,
	SidebarToggleProps,
	Tab,
} from './types';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef } from 'react';
import clsx from 'clsx';
import Kbd from '../ui/typography/Kbd';
import MaybeLaterIcon from '../../icons/MaybeLaterIcon';
import ExclusionTab from '../Tabs/ExlusionTab';
import Link from 'next/link';
import InboxIcon from '../../icons/InboxIcon';
import { CheckIcon } from '@heroicons/react/24/solid';
import useClickOutside from '../../hooks/useClickOutside';
import TargetIcon from '../../icons/TargetIcon';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-5 h-5 text-surface-12" />,
		value: 'inbox',
		label: 'Home',
		href: '/',
	},

	{
		icon: <TargetIcon className="w-5 h-5 text-surface-12" />,
		value: 'today',
		label: 'Focus',
		href: '/today',
	},
	{
		icon: <CheckIcon className="w-5 h-5 text-surface-12" />,
		value: 'notes',
		label: 'Complete',
		href: '/complete',
	},
	{
		icon: <TrashIcon className="w-5 h-5 text-surface-12" />,
		value: 'trash',
		label: 'Trash',
		href: '/trash',
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
							active={false}
							callback={props.setActiveTab}
							href={tab.href}
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

	return (
		<div
			className={
				'overflow-y-auto justify-between h-full flex-shrink-0 flex-grow-0 flex flex-col'
			}>
			<div className="bg-white bg-opacity-75 h-full border border-surface-4 pt-16 border-r">
				<SidebarNavigation
					isExpanded={isExpanded}
					toggle={toggle}
					expand={expand}
					setActiveTab={setActiveTab}
					activeTab={query.active}
				/>
				<Lists />
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
			}>
			<ExclusionTab
				id={'sidebar'}
				isActive={isActive}>
				<p
					className={clsx(
						'p-2 gap-4 flex w-full transition-all text-md font-semibold rounded-xl items-center',
						props.active ? 'text-surface-12' : 'text-surface-11',
					)}>
					{props.icon}
					{props.label}
				</p>
			</ExclusionTab>
		</Link>
	);
}

function Lists({}) {
	return (
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
			<CreateList />
		</div>
	);
}

function CreateList() {
	const [isOpened, toggle] = useToggle(false);
	const ref = useRef(null);

	useClickOutside(ref, toggle);

	return (
		<>
			{!isOpened && (
				<button
					onClick={toggle}
					className="flex items-center gap-4 p-4 text-surface-11 hover:bg-surface-3 rounded-xl">
					<PlusIcon className="w-5 h-5" />
					<p className="flex items-center justify-between flex-1">
						<span>New list</span>
						<Kbd keys={['⌘', 'L']} />
					</p>
				</button>
			)}

			{isOpened && (
				<form
					ref={ref}
					className="p-2 rounded-xl bg-surface-1 border">
					<div className="flex gap-2 w-full items-center">
						<button
							type={'button'}
							className="p-4 rounded-xl hover:bg-surface-4">
							<p className="flex items-center h-4 gap-4 font-medium rounded-md aspect-square ring-2 ring-primary-10"></p>
						</button>
						<input
							name={'title'}
							autoFocus
							className="p-2 flex-1 bg-transparent outline-none font-semibold"
							placeholder="Enter list name"
						/>
					</div>
				</form>
			)}
		</>
	);
}
