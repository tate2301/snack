import { AppNavigation } from './types';
import { motion } from 'framer-motion';

export default function AppRouter() {
	return (
		<>
			<SidebarContainerPresentation />
		</>
	);
}

const PlaceholderDiv = () => <div></div>;

const SidebarContainerPresentation = (props: AppNavigation) => {
	return (
		<motion.div className="flex flex-col justify-between flex-1 overflow-y-auto h-fullpy-2">
			<div className="flex flex-col flex-1 p-2 overflow-y-auto"></div>
		</motion.div>
	);
};
