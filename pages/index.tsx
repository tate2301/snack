'use client';
import CalendarLayout from '../layouts/CalendarLayout';
import { motion } from 'framer-motion';
import TaskListItem from '../components/Home/TaskListItem';
import { generateUUID } from '../lib/functions';
import CreateTask from '../components/create/CreateTask';
import NavLink from '../components/nav/NavLink';

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

