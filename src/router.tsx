import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Splash from './features';
import HomePage from './features/inbox';
import SnackApplicationProvider from './App';
import TrashPage from './features/task/pages/silenced';
import ListPage from './features/project/[id]';
import TaskPage from './features/task/pages/[taskId]';
import TodayPage from './features/task/pages/today';
import SilencedPage from './features/task/pages/silenced';
import CalendarPage from './features/calendar';
import NavigationSidebar from './components/navigation/sidebar/Sidebar';
import { DailyPlanner } from './layouts/CalendarLayout';
import { featureFlags } from './lib/core/config';

const SnackRouter = () => {
	return (
		<div className="relative flex flex-col w-screen h-screen overflow-hidden">
			<SnackApplicationProvider>
				<MemoryRouter basename="/">
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
								path={'/components'}
								element={<CalendarPage />}
							/>
							<Route
								path={'/list/:id'}
								element={<ListPage />}
							/>
							<Route
								path={'/task/:id'}
								element={<TaskPage />}
							/>
						</Routes>
						{featureFlags.planner && <DailyPlanner />}
					</div>
				</MemoryRouter>
			</SnackApplicationProvider>
		</div>
	);
};

export default SnackRouter;
