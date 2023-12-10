import useToggle from '../../../lib/hooks/useToggle';
import {
	AppNavigation,
	NavItem as NavItemType,
	SidebarToggleProps,
	Tab,
} from '../types';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import ExclusionTab from '../../ui/ExlusionTab';
import { useAppSelector } from '../../../redux/store';
import { selectAllLists as selectAllLists } from '../../../redux/lists';
import { AnimatePresence, motion } from 'framer-motion';
import tabs from '../header/tabs';
import ProjectSidebarItem from '../../../features/project/components/ProjectSidebarItem';
import ManageListForm, {
	ManageListFormAction,
} from '../../../features/project/components/forms/CreateProject';
import {
	selectStarredItemById,
	selectStarredItems,
} from '../../../redux/starred';
import { AppEntity, Starred } from '../../../redux/starred/types';
import { UserGroupIcon, FolderIcon } from '@heroicons/react/20/solid';
import { useContext, useEffect, useMemo, useState } from 'react';
import { SnackList } from '../../../redux/lists/types';
import InProgressIcon from '../../../assets/icons/InProgressIcon';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { CommandContext } from '../../../context/CommandContext';
import Search from '../ControlCenter/Search';
import useWindowFocus from '../../../lib/hooks/useWindowFocus';
import { cn } from '../../../lib/utils';
import StarIcon from '../../../assets/icons/StarIcon';
import TimeTracker from '../../../features/time-tracking';
import { iconColors } from '../../../styles/constants';
import SFSymbol from '../../../assets/icons/SFSymbol';

export default function NavigationSidebar() {
	const [isExpanded, toggle, expand] = useToggle(true);
	const { isWindowFocused } = useWindowFocus();

	return (
		<div
			className={cn(
				'overflow-y-hidden w-64 justify-between h-full transition-all bg-white/20',
				'flex-shrink-0 flex-grow-0 flex flex-col z-40 border-r border-zinc-400/30 shadow-sm',
				!isWindowFocused && 'opacity-60',
			)}>
			<div className="flex flex-col h-full pt-12">
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
	const { openCreateTask } = useContext(CommandContext);

	const onCreateTask = () => {
		openCreateTask('default');
	};

	return (
		<div className="sticky flex flex-col flex-1 h-full overflow-y-auto gap-8">
			<div className="flex flex-col gap-4 shadow-xs px-1 mt-4">
				<div className="flex flex-col w-full gap-2 px-2">
					<div className={'space-y-1 font-semibold'}>
						{tabs.map((tab: NavItemType) => (
							<div key={tab.value}>
								<NavItem
									{...tab}
									active={false}
									callback={() => {}}
									href={tab.href}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-col px-3">
				<div className="flex justify-between items-center">
					<p className="subheadline text-surface-9 px-2">Boards</p>
					<ManageListForm action={ManageListFormAction.Create} />
				</div>
				<div>
					<Projects />
				</div>
			</div>
			<div className="hover:shadow-md absolute bottom-0 left-0 w-full border-t border-surface-8 px-2 py-1 rounded-none">
				<NavItem
					icon={
						<SFSymbol
							color={'#404040'}
							name={'plus'}
							className="!w-5 !h-5 text-primary-11"
						/>
					}
					label="New task"
					value={'create'}
					action={onCreateTask}
				/>
			</div>
		</div>
	);
}

function NavItem(
	props: NavItemType & {
		active?: boolean;
		callback?: (v: Tab) => void;
		action?: () => void;
	},
) {
	const path = useLocation();
	const isActive = props.active || path.pathname === props.href;
	if (props.action)
		return (
			<button
				onClick={props.action}
				className={cn(
					'px-2 py-1 relative justify-between flex w-full transition-all text-md !font-base rounded-lg items-center',
				)}>
				<span className="flex gap-3 items-center text-surface-12 font-normal">
					{props.icon}
					{props.label}
				</span>
			</button>
		);

	return (
		<Link
			to={props.href}
			className="rounded-lg">
			<p
				className={cn(
					'px-2 py-1 justify-between relative overflow-hidden flex w-full transition-all text-md !font-base rounded-lg items-center',
				)}>
				{isActive && (
					<span className="w-full absolute h-full top-0 left-0 bg-surface-11 opacity-20 mix-blend-overlay" />
				)}

				<span
					className={cn('flex gap-3 items-center text-surface-12 font-normal')}>
					{props.icon}
					{props.label}
				</span>
			</p>
		</Link>
	);
}

const StarredItems = () => {
	const starredItems = useAppSelector(selectStarredItems);

	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm font-semibold text-surface-9 px-2">Favorites</p>
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
			style={{
				WebkitTapHighlightColor: 'transparent',
			}}
			className={clsx(
				'rounded-lg flex gap-2 relative items-center px-2 py-1.5 hover:bg-surface-6 mb-1',
				isActive && 'bg-surface-7',
			)}>
			{isActive && (
				<motion.span
					layoutId={'starred'}
					className="absolute top-0 left-0 z-10 w-full h-full rounded-lg bg-surface-7"
					transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
				/>
			)}
			<p>
				<StarIcon className="w-6 h-6 text-primary-10" />
			</p>
			<p className="font-base line-clamp-1 flex-1">{starredItem.meta?.name}</p>
			{false && (
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
			)}
		</div>
	);
};

function Projects({}) {
	const projects = useAppSelector(selectAllLists);
	return (
		<>
			<AnimatePresence initial={false}>
				{projects.map((list) => (
					<ProjectSidebarItem
						list={list}
						key={list.id}
					/>
				))}
			</AnimatePresence>
		</>
	);
}
