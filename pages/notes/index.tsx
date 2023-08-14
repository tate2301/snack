import CalendarLayout from '../../layouts/CalendarLayout';
import CreateNote from '../../components/create/CreateNote';
import { motion } from 'framer-motion';
import NavLink from '../../components/nav/NavLink';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PostItNoteIcon from '../../icons/PostItNoteIcon';

const NotesPage = () => {
	return (
		<CalendarLayout>
			<main className="flex gap-4 items-start">
				<button className="p-2 rounded-xl">
					<PostItNoteIcon className="w-8 h-8" />
				</button>
				<div className="flex-1">
					<p className={'mb-2 py-1 flex gap-2 items-center'}>
						<span className="text-3xl text-surface-12">
							Notes and bookmarks
						</span>
					</p>
					<form className={'mb-8 mt-4'}>
						<CreateNote />
					</form>
					<Nav />
					<div className={'flex flex-col gap-2'}>
						<div
							className={'p-3 flex flex-col rounded-lg bg-surface-1 shadow-sm'}>
							<div className={'flex items-center gap-2'}>
								<div className={'h-6 rounded-lg aspect-square'}>
									<img
										src={'https://arc.net/favicon.png'}
										alt={'Arc logo'}
										className={'w-full h-full'}
									/>
								</div>
								<div className={'flex items-baseline gap-2'}>
									<p className={'text-surface-12'}>
										Arc from The Browser Company
									</p>
									<p className={'text-surface-10 text-sm'}>arc.net</p>
								</div>
							</div>
							<div
								className={
									'flex gap-4 text-sm mt-1 text-surface-10 items-center'
								}>
								<p className={'uppercase text-sm'}>10:02</p>
								<p className={'text-surface-10 line-clamp-1'}>
									Arc is a new kind of email client, designed to help you get
									through your inbox faster. It's packed with tools that make
									dealing with email less of a chore, including quick replies,
									UI customization, effortless organization, and powerful
									integrations.
								</p>
							</div>
						</div>
						<div
							className={'p-3 flex flex-col rounded-lg bg-surface-1 shadow-sm'}>
							<div className={'flex items-center gap-2'}>
								<p className={'h-4 rounded-lg aspect-square bg-zinc-900'} />
								<div className={'flex items-baseline gap-2'}>
									<p className={'text-surface-12'}>rgba(0, 0, 0, 0.5)</p>
								</div>
							</div>
							<div className={'flex gap-4 items-center text-surface-10 mt-1'}>
								<p className={'uppercase text-sm'}>10:02</p>
								<p className={'text-sm'}>No additional text</p>
							</div>
						</div>
						<div className={'p-3 flex flex-col rounded-lg bg-surface-1'}>
							<div className={'flex items-center gap-2'}>
								<p className={'h-4 rounded aspect-square bg-warning-10'} />
								<div className={'flex items-baseline gap-2'}>
									<p className={'text-surface-12'}>var(--amber-10)</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</CalendarLayout>
	);
};

const Nav = () => {
	const router = useRouter();

	useEffect(() => {
		if (!router.query.active) {
			router.query.active = 'all';
			router.push(router);
		}
	}, [router.query]);

	return (
		<motion.div className="flex gap-2 mb-4">
			<NavLink
				href={{
					query: {
						activeTab: 'all',
					},
				}}>
				All
			</NavLink>
			<NavLink
				href={{
					query: {
						activeTab: 'notes',
					},
				}}>
				Notes
			</NavLink>
			<NavLink
				href={{
					query: {
						activeTab: 'links',
					},
				}}>
				Links
			</NavLink>
		</motion.div>
	);
};

export default NotesPage;
