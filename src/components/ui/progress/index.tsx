import React, { useEffect } from 'react';
import * as Progress from '@radix-ui/react-progress';

const ProgressBar = (props: { value: number }) => {
	const [progress, setProgress] = React.useState(0);

	useEffect(() => {
		setProgress(props.value);
	}, [props.value]);

	return (
		<Progress.Root
			className="relative overflow-hidden bg-zinc-900 bg-opacity-10 rounded-full h-2"
			style={{
				// Fix overflow clipping in Safari
				// https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
				transform: 'translateZ(0)',
			}}
			value={progress}>
			<Progress.Indicator
				className="bg-primary-10 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
				style={{ transform: `translateX(-${100 - progress}%)` }}
			/>
		</Progress.Root>
	);
};

export default ProgressBar;
