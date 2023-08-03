import { useRouter } from 'next/router';
import CalendarPreview from '../calendar/CalendarPreview';
import { AppNavigation, SidebarToggleProps, Tab } from './types';
import { motion } from 'framer-motion';
import { useCallback, useMemo } from 'react';

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

const SidebarContainerPresentation = (
	props: AppNavigation & SidebarToggleProps,
) => {
	return (
		<motion.div
			initial={{
				width: 0,
				opacity: 0,
			}}
			animate={{
				width: props.isExpanded ? 300 : 0,
				opacity: props.isExpanded ? 1 : 0,
			}}
			transition={{
				duration: 0.1,
			}}
			className="flex-1 overflow-y-auto flex flex-col justify-between h-full">
			<div></div>
			<div className="p-4">
				<CalendarPreview />
			</div>
		</motion.div>
	);
};
