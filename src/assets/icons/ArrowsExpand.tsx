import React from 'react';

function ArrowsExpand(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			{...props}
			viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M14.648 2.4h6.951m0 0v6.952m0-6.952l-8.11 8.11M9.352 21.6H2.401m0 0v-6.952m0 6.952l8.11-8.11"></path>
		</svg>
	);
}

export default ArrowsExpand;
