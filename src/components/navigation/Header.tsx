import {
	ArrowLeftIcon,
	ListBulletIcon,
	ViewColumnsIcon,
} from '@heroicons/react/24/outline';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { cn, remToPx } from '../../lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommandContext } from '../../context/CommandContext';
import { motion } from 'framer-motion';
import TimeTracker from '../../plugins/integrations/time-tracking';
import SFSymbol from '../../assets/icons/SFSymbol';
import { iconColors } from '../../styles/constants';

type ContextMenuOptions = {
	search?: boolean;
	settings?: boolean;
	help?: boolean;
	listingStyle?: boolean;
	share?: boolean;
	sort?: boolean;
	create?: boolean;
	back?: boolean;
	more?: boolean;
};

export enum PageType {
	Project,
	Task,
	Generic,
}

const PageHeader = (props: {
	children?: ReactNode;
	actions?: ReactNode;
	pageType?: PageType;
	title?: ReactNode;
	projectId?: string;
	options?: ContextMenuOptions;
}) => {
	const [width, setWidth] = useState(0);
	// check if we're on windows. Check from electron
	const [showBorder, setShowBorder] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			console.log({ showBorder });

			if (window.scrollY > 2 * 16) {
				setShowBorder(true);
			} else {
				setShowBorder(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const calculateDimensions = () => {
			const areaWidth =
				// @ts-ignore
				window.navigator.windowControlsOverlay?.getTitlebarAreaRect();
			if (areaWidth) setWidth(areaWidth.width - remToPx(20));
		};

		calculateDimensions();

		// @ts-ignore
		navigator.windowControlsOverlay.addEventListener('geometrychange', () =>
			calculateDimensions(),
		);

		return () =>
			// @ts-ignore
			navigator.windowControlsOverlay.removeEventListener(
				'geometrychange',
				() => calculateDimensions(),
			);
	}, []);

	return (
		<motion.header
			className={cn(
				'sticky w-full top-0 right-0 z-30 vibrant-container p-0',
				showBorder && 'border-zinc-400/20 shadow',
			)}>
			<nav className="flex sticky top-0 px-2 drag vibrant-element border-b transition-all border-zinc-400/20 shadow-xs items-center py-2 gap-1">
				{props.options?.back && <NavigationAction />}
				<div className="px-2 flex-1 flex gap-2 items-center">
					<p className="font-bold truncate text-ellipsis pr-8 text-surface-12 headline">
						{props.title}
					</p>
					{props.children}
				</div>
				<div className="flex-shrink-0 flex items-center space-x-8 transition-all">
					{props.options?.create && (
						<CreateTaskButton projectId={props.projectId ?? null} />
					)}
					<div className="flex gap-2 items-center">{props.actions}</div>
					{props.options?.more && <MoreAction />}
				</div>
			</nav>
		</motion.header>
	);
};

const CreateTaskButton = (props: { projectId: string }) => {
	const { openCreateTask } = useContext(CommandContext);

	const onClick = () => {
		openCreateTask(props.projectId);
	};

	return (
		<button
			onClick={onClick}
			className="flex gap-2 items-center rounded-lg p-1.5 text-surface-12 hover:bg-surface-6">
			<SFSymbol
				name={'plus.circle.fill'}
				color={iconColors.primary}
			/>
		</button>
	);
};

const NavigationAction = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<div className="flex gap-1 items-center">
			<button
				disabled={pathname === '/home'}
				onClick={() => navigate(-1)}
				className="p-1 rounded-lg hover:bg-surface-4 disabled:hover:bg-transparent disabled:text-surface-8">
				<ArrowLeftIcon className="w-5 h-5" />
			</button>
		</div>
	);
};

const MoreAction = () => {
	return (
		<button className="p-2 rounded-lg hover:bg-zinc-900/5 text-surface-10">
			<SFSymbol
				name={'ellipsis.circle'}
				color={'#121212'}
			/>
		</button>
	);
};

const ViewStyle = () => {
	return (
		<div className="flex gap-1 rounded-lg bg-surface-3 p-1">
			<button className="py-1 px-2 rounded-md">
				<ListBulletIcon className="w-5 h-5" />
			</button>
			<button className="py-1 px-2 rounded-md bg-surface-1 shadow">
				<ViewColumnsIcon className="w-5 h-5" />
			</button>
		</div>
	);
};

export default PageHeader;
