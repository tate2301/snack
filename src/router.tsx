import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Splash from './pages';
import HomePage from './pages/home';
import SnackApplicationProvider from './App';
import InProgressPage from './pages/in-progress';
import CompletePage from './pages/complete';
import TrashPage from './pages/trash';
import ListPage from './pages/list/[id]';
import TaskPage from './pages/task/[taskId]';

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
						path={'/complete'}
						element={<CompletePage />}
					/>
					<Route
						path={'/in-progress'}
						element={<InProgressPage />}
					/>
					<Route
						path={'/trash'}
						element={<TrashPage />}
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
