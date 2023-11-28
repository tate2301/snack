import React from 'react';

function CollapseSidebarIcon(props: { className?: string }) {
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
				strokeWidth="2"
				d="M9 21V3m12.6 15V6A3.6 3.6 0 0018 2.4H6A3.6 3.6 0 002.4 6v12A3.6 3.6 0 006 21.6h12a3.6 3.6 0 003.6-3.6z"></path>
		</svg>
	);
}

export default CollapseSidebarIcon;
