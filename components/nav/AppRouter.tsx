import { AppNavigation, Tab } from './types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export default function AppRouter() {
	const router = useRouter();
	const _query = useMemo(() => router.query, [router]);

	const query = {
		active: _query.activeTab as Tab,
	};

	const setActiveTab = useCallback(
		(tab: Tab) => {
			router.query.activeTab = tab;
			router.push(router);
		},
		[router],
	);

	return (
		<>
			<SidebarContainerPresentation
				activeTab={query.active}
				setActiveTab={setActiveTab}
			/>
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
