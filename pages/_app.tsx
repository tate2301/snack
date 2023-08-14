import { DndContext } from '@dnd-kit/core';
import '../styles/global.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { useEffect, useLayoutEffect } from 'react';
import { Database } from '../lib/database';
import CommandBar from '../components/commandbar';
import { AuthContextProvider } from '../context/AuthContext';
import Inspect from 'inspx';

export default function App({ Component, pageProps }) {
	useEffect(() => {
		const db = Database.getInstance();
	}, []);

	return (
		<AuthContextProvider>
			<div
				className="flex flex-col w-screen h-screen mx-auto overflow-hidden overflow-y-auto text-base subpixel-antialiased font-normal text-surface-11"
				id="app-container">
				<Head>
					<title>Snack ⏲</title>
				</Head>

				<Provider store={store}>
					<DndContext>
						<Component {...pageProps} />
					</DndContext>
				</Provider>
			</div>
		</AuthContextProvider>
	);
}
