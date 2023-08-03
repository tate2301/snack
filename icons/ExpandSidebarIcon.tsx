import React from 'react';

function ExpandSidebarIcon(props: { className?: string }) {
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
				strokeWidth="2"
				d="M9 2.4v19.2M13.2 6h3.6m-3.6 3.6h3.6m-3.6 3.6h.6M6 21.6h12a3.6 3.6 0 003.6-3.6V6A3.6 3.6 0 0018 2.4H6A3.6 3.6 0 002.4 6v12A3.6 3.6 0 006 21.6z"></path>
		</svg>
	);
}

export default ExpandSidebarIcon;
