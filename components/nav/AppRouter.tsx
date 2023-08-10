import CalendarPreview from '../calendar/CalendarPreview';
import { AppNavigation, SidebarToggleProps } from './types';
import { motion } from 'framer-motion';
import { Apps } from '../../apps';

export default function AppRouter(props: AppNavigation & SidebarToggleProps) {
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
		<motion.div className="w-[32rem]f lex-1 overflow-y-auto flex flex-col justify-between h-full shadow-sm border-l border-zinc-200 py-2">
			<div className="flex flex-col overflow-y-auto flex-1 p-2">
				<App />
			</div>
		</motion.div>
	);
};
