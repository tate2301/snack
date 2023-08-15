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
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
	addListItem,
	selectAllLists as selectAllLists,
} from '../../redux/lists';
import { useFormik } from 'formik';
import { SnackList } from '../../redux/lists/types';
import { generateUUID } from '../../lib/functions';
import { UserAccount } from '../UserAccount';

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
			<div className="bg-white  h-full border border-surface-4 pt-8 border-r">
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
	const lists = useAppSelector(selectAllLists);
	return (
		<div className="flex flex-col gap-2 p-2 mt-8">
			<p className="px-4 uppercase">Lists</p>
			<div>
				{lists.map((list) => (
					<div className="flex flex-col justify-center">
						<button className="flex items-center gap-4 p-4 font-semibold text-surface-12 rounded-xl hover:bg-surface-3">
							<p
								style={{
									borderColor: `var(--${list.color}-10)`,
								}}
								className="flex items-center h-4 gap-4 font-medium rounded-md aspect-square border-2"></p>
							<p>{list.name}</p>
						</button>
					</div>
				))}
			</div>
			<CreateList />
		</div>
	);
}

const colors = ['green', 'purple', 'tomato', 'blue', 'amber', 'gray'];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

function CreateList() {
	const dispatch = useAppDispatch();

	const [isOpened, toggle] = useToggle(false);
	const ref = useRef(null);

	const form = useFormik({
		initialValues: {
			title: '',
		},
		onSubmit: (values) => {
			if (!values.title) return toggle();
			const newList: SnackList = {
				name: values.title,
				color: getRandomColor(),
				id: generateUUID(),
				tasks: [],
			};

			dispatch(addListItem(newList));
			form.resetForm();
			toggle();
		},
	});

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
					onSubmit={form.handleSubmit}
					className="p-2 rounded-xl bg-surface-1 border">
					<div className="flex gap-2 w-full items-center">
						<button
							type={'button'}
							className="p-4 rounded-xl hover:bg-surface-4">
							<p className="flex items-center h-4 gap-4 font-medium rounded-md aspect-square ring-2 ring-primary-10"></p>
						</button>
						<input
							name={'title'}
							{...form.getFieldProps('title')}
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
