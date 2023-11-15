import useToggle from '../../hooks/useToggle';
import {
	AppNavigation,
	NavItem as NavItemType,
	SidebarToggleProps,
	Tab,
} from './types';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import ExclusionTab from '../ui/ExlusionTab';
import { useAppSelector } from '../../redux/store';
import { selectAllLists as selectAllLists } from '../../redux/lists';
import { AnimatePresence } from 'framer-motion';
import tabs from './tabs';
import ListNavigationItem from '../Project/ListNavigationItem';
import ManageListForm, {
	ManageListFormAction,
} from '../Project/forms/CreateProject';
import { selectStarredItemById, selectStarredItems } from '../../redux/starred';
import { AppEntity, Starred } from '../../redux/starred/types';
import { UserGroupIcon, FolderIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';
import { SnackList } from '../../redux/lists/types';
import ExternalLink from '../../icons/ExternalLink';
import InProgressIcon from '../../icons/InProgressIcon';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

export default function NavigationSidebar({}) {
	const [isExpanded, toggle, expand] = useToggle(true);
	return (
		<div
			className={
				'overflow-y-hidden justify-between h-full flex-shrink-0 flex-grow-0 flex flex-col bg-zinc-100/90 '
			}>
			<div className="flex flex-col h-full pt-8 backdrop-blur-xl">
				<SidebarNavigation
					isExpanded={isExpanded}
					toggle={toggle}
					expand={expand}
				/>
			</div>
		</div>
	);
}

function SidebarNavigation(props: AppNavigation & SidebarToggleProps) {
	return (
		<div className="sticky flex flex-col flex-1 w-80 h-full overflow-y-auto">
			<div className="flex flex-col gap-4 border-b border-zinc-400/10 shadow-xs px-1">
				<div className="flex flex-col w-full gap-1 p-2">
					<div className="mt-4">
						<p className="text-sm font-semibold text-surface-9 mb-2">
							Navigation
						</p>
						{tabs.map((tab: NavItemType) => (
							<NavItem
								key={tab.value}
								{...tab}
								active={false}
								callback={() => {}}
								href={tab.href}
							/>
						))}
						<NavItem
							icon={<PlusCircleIcon className="w-5 h-5 text-primary-10" />}
							label="Add new task"
							value={'create'}
							callback={() => null}
						/>
					</div>
				</div>
			</div>
			<div className="flex-1 py-4 px-3 flex flex-col gap-8">
				<StarredItems />

				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center pr-2">
						<p className="text-sm font-semibold text-surface-9">Projects</p>
						<ManageListForm action={ManageListFormAction.Create} />
					</div>
					<div>
						<Projects />
					</div>
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
	const path = useLocation();
	const isActive = props.active || path.pathname === props.href;
	return (
		<Link
			to={props.href}
			className="rounded-lg">
			<ExclusionTab
				id={'sidebar'}
				isActive={isActive}>
				<p
					className={clsx(
						'px-2 py-0.5 justify-between flex w-full transition-all text-md !font-base rounded-lg items-center',
						props.active && '',
					)}>
					<span className="flex gap-2 items-center text-surface-12 font-normal">
						{props.icon}
						{props.label}
					</span>
				</p>
			</ExclusionTab>
		</Link>
	);
}

const StarredItems = () => {
	const starredItems = useAppSelector(selectStarredItems);

	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm font-semibold text-surface-9">Favorites</p>
			<div className="flex flex-col">
				{starredItems.map((item) => (
					<StarredListItem
						{...item}
						key={item.id}
					/>
				))}
				{starredItems.length === 0 && <p className="px-4">No starred items</p>}
			</div>
		</div>
	);
};

const StarredListItem = (props: Starred) => {
	const { id } = useParams();
	const isActive = id === props.id;

	const starredItem = useAppSelector(selectStarredItemById(props.id));
	const navigate = useNavigate();

	const basePath = useMemo(() => {
		if (starredItem.entity === AppEntity.Project) return '/list';
		if (starredItem.entity === AppEntity.Task) return '/task';
	}, [starredItem]);

	if (!starredItem) return;

	const onClick = () => {
		navigate(`${basePath}/${starredItem.id}`);
	};

	return (
		<div
			onClick={onClick}
			className={clsx(
				'rounded-lg flex gap-2 items-center px-4 py-1.5 hover:bg-surface-3',
				isActive && 'bg-surface-5',
			)}>
			<p className="flex-shrink-0 text-surface-10">
				{props.entity === AppEntity.Project && (
					<FolderIcon
						style={{ fill: `#${(starredItem.meta as SnackList).color}` }}
						className="w-5 h-5"
					/>
				)}
				{props.entity === AppEntity.Task && (
					<InProgressIcon className="w-5 h-5 text-surface-10" />
				)}
				{props.entity === AppEntity.Team && (
					<UserGroupIcon className="w-5 h-5" />
				)}
			</p>
			<p className="font-base line-clamp-1">{starredItem.meta?.name}</p>
		</div>
	);
};

function Projects({}) {
	const projects = useAppSelector(selectAllLists);
	return (
		<>
			<AnimatePresence initial={false}>
				{projects.map((list) => (
					<ListNavigationItem
						list={list}
						key={list.id}
					/>
				))}
			</AnimatePresence>
		</>
	);
}
