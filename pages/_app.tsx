import { DndContext } from '@dnd-kit/core';
import '../styles/global.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function App({ Component, pageProps }) {
	return (
		<div
			className="flex flex-col w-screen h-screen mx-auto overflow-hidden overflow-y-auto text-base antialiased font-normal bg-sand-100 text-zinc-900"
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
	);
}
