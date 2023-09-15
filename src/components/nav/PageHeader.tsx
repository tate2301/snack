import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ListBulletIcon,
	MagnifyingGlassIcon,
	MinusIcon,
	PlusIcon,
	QuestionMarkCircleIcon,
	ShareIcon,
	Squares2X2Icon,
	ViewColumnsIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode, useContext, useEffect, useState } from 'react';
import MaximiseIcon from '../../icons/MaximiseIcon';
import { remToPx } from '../../lib/utils';
import { type } from 'os';
import { useNavigate } from 'react-router-dom';
import {
	DocumentIcon,
	FolderIcon,
	QueueListIcon,
	Square3Stack3DIcon,
} from '@heroicons/react/24/solid';
import { CommandContext } from '../../context/CommandContext';

type ContextMenuOptions = {
	search?: boolean;
	settings?: boolean;
	help?: boolean;
	listingStyle?: boolean;
	share?: boolean;
	sort?: boolean;
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
	title?: string;
	projectId?: string;
}) => {
	const [width, setWidth] = useState(0);
	// check if we're on windows. Check from electron
	const isWindows = process.platform === 'win32';

	useEffect(() => {
		const calculateDimensions = () => {
			const areaWidth =
				// @ts-ignore
				window.navigator.windowControlsOverlay?.getTitlebarAreaRect();
			if (areaWidth) setWidth(areaWidth.width - remToPx(24));
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
		<header className="w-full bg-surface-1 sticky top-0 z-10">
			<nav
				style={{
					width: isWindows ? width : '100%',
				}}
				id="page-header"
				className="flex sticky top-0 px-2 bg-surface-1 border-b border-zinc-400/20 items-center py-3 gap-2">
				<NavigationAction />
				<div className="px-2 flex-1 flex gap-2 items-center">
					<PageTypeIcon type={props.pageType ?? PageType.Generic} />
					<p className="font-bold truncate text-ellipsis pr-8 w-96">
						{props.title}
					</p>
					{props.children}
				</div>
				<div className="flex-shrink-0 flex items-center gap-4">
					<CreateTaskButton projectId={props.projectId ?? null} />
					<ViewStyle />
					<div className="flex gap-2 items-center">{props.actions}</div>
					<SearchField />
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
			className="bg-primary-10 flex gap-2 items-center rounded-xl px-3 py-2 text-white">
			<PlusIcon className="w-5 h-5" />
		</button>
	);
};

const PageTypeIcon = (props: { type: PageType }) => {
	return (
		<>
			{props.type === PageType.Generic && <DocumentIcon className="w-5 h-5" />}
			{props.type === PageType.Project && <FolderIcon className="w-5 h-5" />}
			{props.type === PageType.Task && <QueueListIcon className="w-5 h-5" />}
		</>
	);
};

const NavigationAction = () => {
	const navigate = useNavigate();

	return (
		<div className="flex gap-1 items-center">
			<button
				onClick={() => navigate(-1)}
				className="p-2 rounded-xl hover:bg-zinc-900/10">
				<ChevronLeftIcon className="w-5 h-5" />
			</button>
			<button
				onClick={() => navigate(1)}
				className="p-2 rounded-xl hover:bg-zinc-900/10">
				<ChevronRightIcon className="w-5 h-5" />
			</button>
		</div>
	);
};

const ShareAction = () => {
	return (
		<button className="p-2 rounded-xl hover:bg-zinc-900/10">
			<ShareIcon className="w-5 h-5" />
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

const SearchField = () => {
	return (
		<button className="w-64 bg-surface-4 hover:bg-zinc-900/10 px-2 py-1.5 rounded-xl flex gap-2">
			<MagnifyingGlassIcon className="w-5 h-5" />
			Search
		</button>
	);
};

export default PageHeader;
