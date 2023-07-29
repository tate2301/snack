import { XMarkIcon } from '@heroicons/react/24/solid';
import '../styles/global.css';
import Head from 'next/head';
import {
	ArrowsPointingOutIcon,
	Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { MinusIcon } from '@heroicons/react/20/solid';

export default function App({ Component, pageProps }) {
	return (
		<div
			className="flex flex-col w-screen h-screen mx-auto overflow-hidden overflow-y-auto text-base subpixel-antialiased font-normal bg-white rounded-xl text-zinc-800"
			id="app-container">
			<Head>
				<title>Snack ⏲</title>
			</Head>

			<Component {...pageProps} />
		</div>
	);
}
