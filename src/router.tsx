import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Splash from './features';
import HomePage from './features/inbox';
import SnackApplicationProvider from './App';
import TrashPage from './features/task/backlog';
import ListPage from './features/project/[id]';
import TaskPage from './features/task/[taskId]';
import TodayPage from './features/task/today';
import BacklogPage from './features/task/backlog';
import CalendarPage from './features/calendar';

const SnackRouter = () => {
	return (
		<SnackApplicationProvider>
			<MemoryRouter basename="/">
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
						path={'/backlog'}
						element={<BacklogPage />}
					/>

					<Route
						path={'/calendar'}
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
			</MemoryRouter>
		</SnackApplicationProvider>
	);
};

export default SnackRouter;
