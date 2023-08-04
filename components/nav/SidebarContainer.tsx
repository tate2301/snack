import { useRouter } from 'next/router';
import CalendarPreview from '../calendar/CalendarPreview';
import { AppNavigation, SidebarToggleProps, Tab } from './types';
import { motion } from 'framer-motion';
import { useCallback, Fragment } from 'react';
import { Apps } from '../../apps';
import TaskList from '../Home/TaskList';

export default function SidebarContainer(
	props: AppNavigation & SidebarToggleProps,
) {
	return (
		<>
			<SidebarContainerPresentation
				activeTab={props.activeTab}
				{...props}
			/>
		</>
	);
}

const PlaceholderDiv = () => <div></div>;

const SidebarContainerPresentation = (
	props: AppNavigation & SidebarToggleProps,
) => {
	const App = Apps[props.activeTab] ?? PlaceholderDiv;
	return (
		<motion.div
			initial={{
				width: 0,
				opacity: 0,
			}}
			animate={{
				width: props.isExpanded ? 400 : 0,
				opacity: props.isExpanded ? 1 : 0,
			}}
			transition={{
				duration: 0.1,
			}}
			className="flex-1 overflow-y-auto flex flex-col justify-between h-full gap-4">
			<div className="flex flex-col overflow-y-auto flex-1">
				<App />
			</div>
			<div className="p-4">
				<CalendarPreview />
			</div>
		</motion.div>
	);
};
