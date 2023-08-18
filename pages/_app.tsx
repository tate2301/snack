import { DndContext } from '@dnd-kit/core';
import '../styles/global.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AuthContextProvider } from '../context/AuthContext';
import { electronAPI } from '../lib/core/electron';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }) {
	const [databaseLoaded, setDatabaseLoaded] = useState(false);
	const [config, setConfig] = useState<{
		dbPath: string;
	} | null>(null);

	useLayoutEffect(() => {
		electronAPI.loadConfig().then(setConfig);
	}, []);

	useEffect(() => {
		if (config?.dbPath && !databaseLoaded) {
			electronAPI.loadDatabase(config.dbPath);
		}
	}, [config, databaseLoaded]);

	if (!config) return null;

	return (
		<AuthContextProvider>
			<div
				className="flex flex-col w-screen h-screen mx-auto overflow-hidden overflow-y-auto text-base subpixel-antialiased font-normal text-surface-11"
				id="app-container">
				<Head>
					<title>Snack ⏲</title>
				</Head>

				<Provider store={store}>
					<PersistGate
						loading={null}
						persistor={persistor}>
						<DndContext>
							<Component {...pageProps} />
						</DndContext>
					</PersistGate>
				</Provider>
			</div>
		</AuthContextProvider>
	);
}
