import { DndContext } from '@dnd-kit/core';
import './styles/global.css';
import { Provider } from 'react-redux';
import { ReactNode, useEffect, useMemo } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor, useAppSelector } from './redux/store';
import { applicationSettings } from './redux/settings';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import SnackPluginManager, { availablePlugins } from './lib/integrations';
import CommandContextProvider from './context/CommandContext';
import { ToastProvider } from './context/ToastProvider';
import { WindowFocusProvider } from './context/WindowFocusContext';
import { TimeServiceProvider } from './features/time-tracking/context';

export default function SnackApplicationProvider(props: {
	children: ReactNode;
}) {
	return (
		<div
			className="flex flex-col w-screen h-screen mx-auto overflow-hidden overflow-y-auto text-base subpixel-antialiased font-normal text-surface-11 backdrop-blur"
			id="app-container">
			<title>Snack ⏲</title>
			<WindowFocusProvider>
				<TimeServiceProvider>
					<Provider store={store}>
						<PersistGate
							loading={null}
							persistor={persistor}>
							<ToastProvider>
								<CommandContextProvider>
									<Toaster />

									<PluginProvider />
									<DndContext>{props.children}</DndContext>
								</CommandContextProvider>
							</ToastProvider>
						</PersistGate>
					</Provider>
				</TimeServiceProvider>
			</WindowFocusProvider>
		</div>
	);
}

function PluginProvider() {
	useEffect(() => {
		availablePlugins.map((p) => SnackPluginManager.registerPlugin(p));
		SnackPluginManager.loadPlugins();
	}, []);

	return <></>;
}

export const RedirectIfNotOnboarded = ({ children }) => {
	const settings = useAppSelector(applicationSettings);
	const navigate = useNavigate();
	const path = useLocation();

	const isHome = useMemo(() => path.pathname === '/', [path.pathname]);

	useEffect(() => {
		if (!isHome && !settings.onboarded) {
			navigate('/');
		}
	}, [isHome, navigate, settings.onboarded]);

	return children;
};
