import {
	CheckCircleIcon,
	EllipsisVerticalIcon,
	PlusIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import useToggle from '../../hooks/useToggle';
import {
	AppNavigation,
	NavItem as NavItemType,
	SidebarToggleProps,
	Tab,
} from './types';
import { useRouter } from 'next/router';
import {
	RefObject,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import Kbd from '../ui/typography/Kbd';
import ExclusionTab from '../Tabs/ExlusionTab';
import Link from 'next/link';
import InboxIcon from '../../icons/InboxIcon';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
	addListItem,
	removeList,
	selectAllLists as selectAllLists,
	updateList,
} from '../../redux/lists';
import { useFormik } from 'formik';
import { SnackList } from '../../redux/lists/types';
import { generateUUID } from '../../lib/functions';
import { UserAccount } from '../ControlCenter';
import Popover from '../ui/popover';
import InProgressIcon from '../../icons/InProgressIcon';
import CalendarIcon from '../../icons/CalendarIcon';
import Dropdown from '../ui/dropdown-menu';
import { PencilIcon } from '@heroicons/react/20/solid';
import TrashIcon from '../../icons/TrashIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from '@headlessui/react';
import useClickOutside from '../../hooks/useClickOutside';

const tabs: NavItemType[] = [
	{
		icon: <InboxIcon className="w-5 h-5 text-surface-12" />,
		value: 'inbox',
		label: 'Home',
		href: '/home',
	},
	{
		icon: <CalendarIcon className="w-5 h-5 text-surface-12" />,
		value: 'today',
		label: 'Today',
		href: '/today',
	},
	{
		icon: <InProgressIcon className="w-5 h-5 text-surface-12" />,
		value: 'in-progress',
		label: 'In Progress',
		href: '/in-progress',
	},
	{
		icon: <CheckCircleIcon className="w-5 h-5 text-surface-12" />,
		value: 'notes',
		label: 'Complete',
		href: '/complete',
	},
	{
		icon: <XCircleIcon className="w-5 h-5 text-surface-12" />,

		value: 'blocked',
		label: 'Blocked',
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
				'overflow-y-hidden justify-between h-full flex-shrink-0 flex-grow-0 flex flex-col'
			}>
			<div className="flex flex-col h-full bg-white border border-r border-surface-4">
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
						'p-2 justify-between flex w-full text-surface-12 transition-all text-md font-semibold rounded-xl items-center',
						props.active && '',
					)}>
					<span className="flex gap-4">
						{props.icon}
						{props.label}
					</span>
				</p>
			</ExclusionTab>
		</Link>
	);
}

function Lists({}) {
	const lists = useAppSelector(selectAllLists);
	return (
		<div className="flex flex-col flex-1 max-h-full p-2 mt-8 overflow-hidden">
			<p className="px-4 py-2 uppercase border-b">Lists</p>
			<div className="flex-1 pt-1 overflow-y-scroll">
				<AnimatePresence initial={false}>
					{lists.map((list) => (
						<ListItem
							list={list}
							key={list.id}
						/>
					))}
				</AnimatePresence>
			</div>
			<CreateList />
		</div>
	);
}

const colors = [
	'green',
	'purple',
	'tomato',
	'blue',
	'amber',
	'gray',
	'purple',
	'tomato',
];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

function CreateList() {
	const dispatch = useAppDispatch();

	const [isOpened, toggle] = useToggle(false);
	const ref = useRef(null);

	const form = useFormik({
		initialValues: {
			title: '',
			color: getRandomColor(),
		},
		onSubmit: (values) => {
			if (!values.title) return toggle();
			const newList: SnackList = {
				name: values.title,
				color: values.color,
				id: generateUUID(),
				tasks: [],
			};

			dispatch(addListItem(newList));
			form.resetForm();
			toggle();
		},
	});

	// useClickOutside(ref, toggle);

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
					style={{
						backgroundColor: `var(--${form.values.color}-1)`,
						borderColor: `var(--${form.values.color}-6)`,
					}}
					className="p-2 border rounded-lg">
					<div className="flex items-center w-full gap-2">
						<SelectColor
							value={form.values.color}
							onChange={(color) => form.setFieldValue('color', color)}
						/>
						<input
							name={'title'}
							{...form.getFieldProps('title')}
							autoFocus
							className="flex-1 p-2 font-semibold bg-transparent outline-none"
							placeholder="Enter list name"
						/>
					</div>
				</form>
			)}
		</>
	);
}

const SelectColor = (props: {
	value: string;
	onChange: (color: string) => void;
}) => {
	const [isOpened, toggle, onChange] = useToggle(false);
	return (
		<Popover
			open={isOpened}
			onOpenChange={(open) => onChange(open)}>
			<Popover.Trigger>
				<button
					type={'button'}
					className="p-2 rounded-xl hover:bg-surface-4">
					<p
						className="flex items-center h-5 gap-4 font-medium border-2 rounded-md aspect-square"
						style={{
							borderColor: `var(--${props.value}-10)`,
						}}></p>
				</button>
			</Popover.Trigger>
			<Popover.Content>
				<div className="grid grid-cols-4 gap-4 w-fit">
					{colors.map((color) => (
						<button
							key={color}
							onClick={() => props.onChange(color)}
							style={{
								backgroundColor: `var(--${color}-10)`,
							}}
							className={clsx(
								'rounded-lg',
								props.value === color &&
									'ring-2 ring-offset-2 ring-offset-surface-12 ring-surface-6',
							)}>
							<div className="w-4 h-4 rounded-xl" />
						</button>
					))}
				</div>
			</Popover.Content>
		</Popover>
	);
};

const ListOptions = (props: {
	id: string;
	onEdit: () => void;
	onDelete: () => void;
}) => {
	return (
		<Dropdown>
			<Dropdown.Trigger>
				<p className="p-2 opacity-0 rounded-xl hover:bg-surface-1 group-hover:opacity-100">
					<EllipsisVerticalIcon className="w-5 h-5" />
				</p>
			</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.Item onClick={props.onEdit}>
					<p className="flex items-center gap-4">
						<PencilIcon className="w-5 h-5" />
						<span>Rename</span>
					</p>
				</Dropdown.Item>
				<Dropdown.Item>
					<p className="flex items-center gap-4">
						<TrashIcon className="w-5 h-5" />
						<span>Change color</span>
					</p>
				</Dropdown.Item>
				{props.id !== 'default' && (
					<Dropdown.Item onClick={props.onDelete}>
						<p className="flex items-center gap-4">
							<TrashIcon className="w-5 h-5" />
							<span>Delete</span>
						</p>
					</Dropdown.Item>
				)}
			</Dropdown.Content>
		</Dropdown>
	);
};

function ListItem({ list }: { list: SnackList }) {
	const [disabled, toggle] = useToggle(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const prevListDetails = useRef(list);

	const dispatch = useAppDispatch();

	const onEdit = () => {
		inputRef.current?.focus();
		toggle();
	};

	const onDelete = () => {
		dispatch(removeList(list));
	};

	const onSelectListColor = (color: string) => {
		dispatch(updateList({ ...list, color }));
		toggle();
	};

	useEffect(() => {
		if (!disabled) {
			prevListDetails.current = list;
			inputRef.current?.focus();
		}
	}, [disabled, inputRef.current]);

	return (
		<motion.div
			initial={{
				opacity: 0,
				height: 0,
			}}
			animate={{
				opacity: 1,
				height: 'auto',
			}}
			className="relative flex flex-col justify-center group">
			<button className="flex items-center gap-4 p-2 font-semibold text-surface-12 rounded-xl hover:bg-surface-3">
				<p
					style={{
						borderColor: `var(--${list.color}-10)`,
					}}
					className="flex items-center h-4 gap-4 font-medium border-2 rounded-md aspect-square"></p>
				<p className="flex-1 text-left">{list.name}</p>
				<p className="flex items-center gap-2">
					<ListOptions
						onEdit={onEdit}
						id={list.id}
						onDelete={onDelete}
					/>
					{list.tasks.length > 0 && (
						<p>
							<span className="p-1 font-semibold rounded text-surface-10">
								{list.tasks.length}
							</span>
						</p>
					)}
				</p>
			</button>
			{!disabled && (
				<EditList
					disabled={disabled}
					dispatch={dispatch}
					list={list}
					onClose={toggle}
				/>
			)}
		</motion.div>
	);
}

function EditList({ disabled, dispatch, list, onClose }) {
	const [coords, setCoords] = useState({ x: 0, y: 0 });
	const ref = useRef<HTMLDivElement>(null);
	const portalRef = useRef<HTMLDivElement>(null);
	const form = useFormik({
		initialValues: {
			name: list.name,
			color: list.color,
		},
		onSubmit: (values) => {
			console.log({ values });
			dispatch(
				updateList({
					...list,
					name: values.name !== '' ? values.name : list.name,
					color: values.color,
				}),
			);
			onClose();
		},
	});

	useLayoutEffect(() => {
		if (!ref.current) return;
		setCoords({
			x: ref.current.getBoundingClientRect().left,
			y: ref.current.getBoundingClientRect().top,
		});
	}, [ref.current]);

	useClickOutside(portalRef, onClose);

	return (
		<div
			ref={ref}
			className="absolute top-0 left-0">
			<Portal ref={portalRef}>
				<form
					style={{
						top: coords.y,
						left: coords.x,
					}}
					onSubmit={form.handleSubmit}
					className="fixed z-50 flex justify-end w-auto h-auto gap-2 p-2 shadow rounded-xl bg-surface-12">
					<SelectColor
						value={form.values.color}
						onChange={(color) => form.setFieldValue('color', color)}
					/>
					<input
						autoFocus
						name={'name'}
						value={form.values.name}
						disabled={disabled}
						onChange={form.handleChange}
						className="flex-1 text-left text-white bg-transparent outline-none"
						maxLength={30}
					/>
				</form>
			</Portal>
		</div>
	);
}
