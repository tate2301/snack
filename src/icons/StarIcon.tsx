import React from 'react';

function StarIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			{...props}
			viewBox="0 0 21 21">
			<path
				d="m7.5 11.5-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				transform="translate(3 3)"
				strokeWidth={1}
			/>
		</svg>
	);
}

export default StarIcon;
