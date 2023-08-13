'use client';
import { ReactNode, useMemo } from 'react';
import CalendarLayout from '../../layouts/CalendarLayout';
import { motion } from 'framer-motion';
import TaskListItem from '../../components/Home/TaskListItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { generateUUID } from '../../lib/functions';
import CreateTask from '../../components/create/CreateTask';

export default function Page() {

	return (
		<CalendarLayout>
			<main className={'h-full'}>
				<Nav />
				<CreateTask />
				<div className='flex flex-col gap-2 mt-4'>
					<TaskListItem title='Design new App icon to replace eletron logo' id={generateUUID()} />
					<TaskListItem title='Design new App icon to replace eletron logo' id={generateUUID()} />
				</div>
			</main>
		</CalendarLayout>
	);
}

const Nav = () => {
	return (
		<motion.div className='flex gap-2 mb-4'>
			<NavLink
				href={{
					query: {
						activeTab: 'inbox',
					},
				}}>
				Inbox
			</NavLink>
			<NavLink
				href={{
					query: {
						activeTab: 'complete',
					},
				}}>
				Complete
			</NavLink>
		</motion.div>
	);
};

function NavLink(props: {
	children: ReactNode;
	href: Parameters<typeof Link>[0]['href'];
}) {
	const router = useRouter();
	const isActive = useMemo(() => {
		// deep compare href
		// @ts-ignore
		return router.query.activeTab === props.href.query?.activeTab;
	}, [router, props.href]);
	return (
		<Link
			className={clsx(
				'relative px-4 py-1 rounded-xl',
				isActive && 'font-semibold text-surface-12',
			)}
			style={{
				WebkitTapHighlightColor: 'transparent',
			}}
			href={props.href}>
			{isActive && (
				<motion.span
					layoutId='bubble'
					className='absolute inset-0 z-10 bg-surface-4 mix-blend-multiply rounded-xl'
					style={{ borderRadius: 9999 }}
					transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
				/>
			)}
			{props.children}
		</Link>
	);
}
