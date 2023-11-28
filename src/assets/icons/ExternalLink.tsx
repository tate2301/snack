import React from 'react';

function ExternalLink(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			{...props}
			fill="none"
			viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M10.8 2.4H6A3.6 3.6 0 002.4 6v12A3.6 3.6 0 006 21.6h12a3.6 3.6 0 003.6-3.6v-4.8m-6-10.8h6m0 0v5.4m0-5.4L11.4 12.6"></path>
		</svg>
	);
}

export default ExternalLink;
