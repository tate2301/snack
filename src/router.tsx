import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Splash from './features';
import HomePage from './features/inbox';
import SnackApplicationProvider from './App';
import ListPage from './features/project/[id]';
import TodayPage from './features/task/pages/today';
import SilencedPage from './features/task/pages/silenced';
import CalendarPage from './features/calendar';
import NavigationSidebar from './components/navigation/sidebar/Sidebar';
import { DailyPlanner } from './layouts/CalendarLayout';
import { featureFlags } from './lib/core/config';
import KeyboardNavigationContextProvider, {
	useKeyboardShortcuts,
} from './context/KeyboardNavigationContext';
import UpcomingPage from './features/task/pages/upcoming';
import tabs from './components/navigation/header/tabs';
import { stopAllPropagation } from './lib/utils';
import { useMemo } from 'react';

const SnackRouter = () => {
	return (
		<div className="relative flex flex-col w-screen h-screen overflow-hidden">
			<SnackApplicationProvider>
				<MemoryRouter basename="/">
					<KeyboardNavigationContextProvider>
						<div
							className={
								'w-full flex flex-1 items-start h-[calc(100vh-2.5rem)] justify-between'
							}>
							<NavigationSidebar />
							<Routes>
								<Route
									index
									path="/"
									element={<Splash />}
								/>
								<Route
									path="/home"
									element={<HomePage />}
								/>
								<Route
									path={'/today'}
									element={<TodayPage />}
								/>
								<Route
									path={'/silenced'}
									element={<SilencedPage />}
								/>
								<Route
									path={'/future'}
									element={<UpcomingPage />}
								/>

								<Route
									path={'/components'}
									element={<CalendarPage />}
								/>
								<Route
									path={'/list/:id'}
									element={<ListPage />}
								/>
							</Routes>
							{featureFlags.planner && <DailyPlanner />}
						</div>
					</KeyboardNavigationContextProvider>
				</MemoryRouter>
			</SnackApplicationProvider>
		</div>
	);
};

const NavigationShortcutsProvider = () => {
	const navigate = useNavigate();
	const navigateListener = (event: KeyboardEvent) => {
		const page = tabs.find((tab) => tab.shortcut.toLowerCase() === event.key);
		console.log({ page, key: event.key });
		if (!page) return;
		if (event.metaKey) {
			stopAllPropagation(event);
			navigate(page.href);
			return;
		}
	};

	const shortcuts = useMemo(
		() =>
			tabs.map((tab) => ({
				key: tab.shortcut.toLowerCase(),
				callback: navigateListener,
			})),
		[],
	);

	useKeyboardShortcuts(shortcuts);

	return <></>;
};

export default SnackRouter;
