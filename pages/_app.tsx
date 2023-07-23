import '../styles/global.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from '../dev';

export default function App({ Component, pageProps }) {
	return (
		<div
			className='container p-2 bg-white rounded-xl h-screen mx-auto  overflow-y-auto   text-zinc-800 overflow-hidden subpixel-antialiased text-base'
			id='app-container'
		>
			<DevSupport ComponentPreviews={ComponentPreviews}
									useInitialHook={useInitial}
			>
				<Component {...pageProps} />
			</DevSupport>
		</div>
	);
}
