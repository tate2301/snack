import React from 'react';

function UrgentIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			fill="none"
			viewBox="0 0 24 24">
			<g>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M2 21.844l1.486-5.545m0 0L6.246 6l14.414 6.41c-9.754 6.301-16.219.324-17.174 3.889z"></path>
				<path
					fill="currentColor"
					fillRule="evenodd"
					d="M2.156 1.012A1 1 0 001 2v20a1 1 0 102 0V3.17l15.94 2.517a22.4 22.4 0 01-2.682 2.205l2.103.935a26.352 26.352 0 003.38-3.156 1 1 0 00-.585-1.659l-19-3z"
					clipRule="evenodd"></path>
			</g>
		</svg>
	);
}

export default UrgentIcon;
