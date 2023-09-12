import {
	MinusIcon,
	QuestionMarkCircleIcon,
	Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode, useEffect, useState } from 'react';
import MaximiseIcon from '../../icons/MaximiseIcon';
import { remToPx } from '../../lib/utils';

const PageHeader = (props: { children?: ReactNode }) => {
	const [width, setWidth] = useState(0);
	// check if we're on windows. Check from electron
	const isWindows = process.platform === 'win32';
	
	useEffect(() => {
		const calculateDimensions = () => {
			const areaWidth =
				// @ts-ignore
				window.navigator.windowControlsOverlay?.getTitlebarAreaRect();
			if (areaWidth) setWidth(areaWidth.width - remToPx(24));
		};

		calculateDimensions();

		// @ts-ignore
		navigator.windowControlsOverlay.addEventListener('geometrychange', () =>
			calculateDimensions(),
		);

		return () =>
			// @ts-ignore
			navigator.windowControlsOverlay.removeEventListener(
				'geometrychange',
				() => calculateDimensions(),
			);
	}, []);

	return (
		<header className="w-full bg-surface-3 sticky top-0">
			<nav
				style={{
					width: isWindows ? width : '100%',
				}}
				id="page-header"
				className="flex mb-4 sticky top-0 z-10 px-2 py-2 bg-surface-2">
				<div className="px-2 flex-1">{props.children}</div>
			</nav>
		</header>
	);
};

export default PageHeader;
