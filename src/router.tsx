import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Splash from './features';
import HomePage from './features/inbox';
import SnackApplicationProvider from './App';
import InProgressPage from './features/in-progress';
import CompletePage from './features/task/complete';
import TrashPage from './features/task/backlog';
import ListPage from './features/project/[id]';
import TaskPage from './features/task/[taskId]';

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
