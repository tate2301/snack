import useToggle from '../../hooks/useToggle';
import {
	AppNavigation,
	NavItem as NavItemType,
	SidebarToggleProps,
	Tab,
} from './types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
} from '../Lists/forms/CreateProject';
import SnackPluginManager from '../../lib/integrations';
import starred, {
	selectStarredItemById,
	selectStarredItems,
} from '../../redux/starred';
import { AppEntity, Starred } from '../../redux/starred/types';
import {
	QueueListIcon,
	UserGroupIcon,
	FolderIcon,
} from '@heroicons/react/20/solid';
import { useMemo } from 'react';
import { SnackList } from '../../redux/lists/types';
import ExternalLink from '../../icons/ExternalLink';

function SidebarNavigation(props: AppNavigation & SidebarToggleProps) {
	return (
		<div className="sticky flex flex-col flex-1 w-80 h-full">
			<div className="flex flex-col gap-4 bg-white border-b border-zinc-400/30 shadow-xs">
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
				</div>
			</div>
			<div className="flex-1 p-4 flex flex-col gap-8 overflow-y-auto">
				<StarredItems />

				<div className="flex flex-col gap-2">
					<p className="text-sm font-semibold px-4 text-surface-10">Projects</p>
					<div>
						<Projects />
					</div>
					<ManageListForm action={ManageListFormAction.Create} />
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-sm font-semibold px-4 text-surface-10">
						Your teams
					</p>
					<div className="py-0.5 px-4 flex gap-4 text-surface-12 font-semibold items-center">
						<TeamCard name="Innovation Hub" />
						<p>Innovation Hub</p>
					</div>
					<div className="py-0.5 px-4 flex gap-4 text-surface-12 font-semibold">
						<TeamCard name="Dream" />
						<p>Dream TEAM @TIF</p>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="p-4">
						<p className="text-surface-10">
							&copy; RingPro {new Date().getFullYear()}
						</p>
						<p className="text-sm text-surface-10">
							Built with ❤️ at CUT Innovation Hub
						</p>
						<div className="flex gap-4 font-semibold mt-4 text-primary-11">
							<a
								href={'https://ringpro.app/privacy'}
								target="_blank"
								className="flex gap-2 items-center"
								rel="noopener">
								Privacy
								<ExternalLink className="w-4 h-4" />
							</a>
							<a
								href={'https://ringpro.app/tos'}
								className="flex gap-2 items-center"
								target="_blank"
								rel="noopener">
								Terms of use
								<ExternalLink className="w-4 h-4" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const StarredItems = () => {
	const starredItems = useAppSelector(selectStarredItems);
	console.log({ starredItems });
	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm font-semibold px-4 text-surface-10">Starred</p>
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
			className="rounded-xl flex gap-4 items-center px-4 py-1.5 hover:bg-zinc-900/10">
			<p className="flex-shrink-0 text-surface-10">
				{props.entity === AppEntity.Project && (
					<FolderIcon
						style={{ fill: `#${(starredItem.meta as SnackList).color}` }}
						className="w-5 h-5"
					/>
				)}
				{props.entity === AppEntity.Task && (
					<input
						checked={
							// @ts-ignore
							starredItem.meta.complete
						}
						type="checkbox"
					/>
				)}
				{props.entity === AppEntity.Team && (
					<UserGroupIcon className="w-5 h-5" />
				)}
			</p>
			<p className="font-semibold line-clamp-1">{starredItem.meta?.name}</p>
		</div>
	);
};

const TeamCard = (props: { name: string }) => (
	<p className="h-7 w-7 rounded-lg text-sm flex items-center text-center justify-center font-semibold text-white bg-surface-11 border border-surface-12">
		{props.name.split(' ')[0][0]}
		{props.name.split(' ')[1] ? props.name.split(' ')[1][0] : null}
	</p>
);

export default function NavigationSidebar({}) {
	const [isExpanded, toggle, expand] = useToggle(true);
	return (
		<div
			className={
				'overflow-y-hidden justify-between h-full flex-shrink-0 flex-grow-0 flex flex-col'
			}>
			<div className="flex flex-col h-full bg-white pt-16">
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
			className="rounded-xl">
			<ExclusionTab
				id={'sidebar'}
				isActive={isActive}>
				<p
					className={clsx(
						'px-4 py-1 justify-between flex w-full text-surface-12 transition-all text-md font-semibold rounded-xl items-center',
						props.active && '',
					)}>
					<span className="flex gap-4 items-center">
						{props.icon}
						{props.label}
					</span>
				</p>
			</ExclusionTab>
		</Link>
	);
}

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
