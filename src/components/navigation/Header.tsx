import {
	ArrowLeftIcon,
	ListBulletIcon,
	PlusIcon,
	ViewColumnsIcon,
} from '@heroicons/react/24/outline';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { remToPx } from '../../lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	DocumentIcon,
	FolderIcon,
	QueueListIcon,
} from '@heroicons/react/24/solid';
import { CommandContext } from '../../context/CommandContext';
import ShareIcon from '../../icons/ShareIcon';
import ControlCentre from '../ControlCenter/Search';

type ContextMenuOptions = {
	search?: boolean;
	settings?: boolean;
	help?: boolean;
	listingStyle?: boolean;
	share?: boolean;
	sort?: boolean;
	create?: boolean;
	back?: boolean;
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
	const isWindows = process.platform === 'win32';

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
		<header className="w-full bg-white sticky top-0 z-10">
			<nav
				style={{
					width: isWindows ? width : '100%',
				}}
				id="page-header"
				className="flex sticky top-0 px-2 bg-white hover:shadow-sm transition-all border-zinc-400/30 items-center py-2 gap-1">
				{props.options?.back && <NavigationAction />}
				<div className="px-2 flex-1 flex gap-2 items-center">
					<p className="font-bold truncate text-ellipsis pr-8 text-surface-12">
						{props.title}
					</p>
					{props.children}
				</div>
				<div className="flex-shrink-0 flex items-center space-x-8 transition-all">
					{props.options?.create && (
						<CreateTaskButton projectId={props.projectId ?? null} />
					)}
					<div className="flex gap-2 items-center">{props.actions}</div>
					{props.options?.listingStyle && <ViewStyle />}
					{props.options?.share && <ShareAction />}
					<ControlCentre />
				</div>
			</nav>
		</header>
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
			className="hover:bg-zinc-900/5 flex gap-2 items-center rounded-lg p-1.5 text-surface-12 bg-surface-2">
			<PlusIcon className="w-5 h-5" />
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

const ShareAction = () => {
	return (
		<button className="p-1 rounded-lg hover:bg-zinc-900/5 text-surface-10">
			<ShareIcon className="w-6 h-6" />
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
