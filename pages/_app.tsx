import { DndContext } from '@dnd-kit/core';
import '../styles/global.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AuthContextProvider } from '../context/AuthContext';
import { electronAPI } from '../lib/core/electron';
import { PersistGate } from 'redux-persist/integration/react';
import { createStoreAsync } from '../redux/store';
import { persistStore } from 'redux-persist';

export default function App({ Component, pageProps }) {
	const store = useRef(null);
	const persistor = useRef(null);

	const [appLoaded, setAppLoaded] = useState(false);
	const [config, setConfig] = useState<{
		dbPath: string;
	} | null>(null);

	useLayoutEffect(() => {
		electronAPI.loadConfig().then(setConfig);
	}, []);

	useEffect(() => {
		const loadStore = async () => {
			const createdStore = await createStoreAsync();
			const persistorInMemory = await persistStore(createdStore);

			store.current = createdStore;
			persistor.current = persistorInMemory;
		};

		const setGlobals = async () => {
			global.path = electronAPI.require('path');
			global.fs = electronAPI.require('fs');
		};

		if (typeof window !== 'undefined') {
			setGlobals()
				.then(loadStore)
				.then(() => setAppLoaded(true));
		}
	}, [config]);

	if (!appLoaded)
		return (
			<div className="flex items-center justify-center w-screen h-screen">
				<p>Please wait a second</p>
			</div>
		);

	return (
		<AppContainer
			store={store.current}
			persistor={persistor.current}>
			<Component {...pageProps} />
		</AppContainer>
	);
}

const AppContainer = ({ children, store, persistor }) => {
	// dynamically import store and persistor

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
						<DndContext>{children}</DndContext>
					</PersistGate>
				</Provider>
			</div>
		</AuthContextProvider>
	);
};
