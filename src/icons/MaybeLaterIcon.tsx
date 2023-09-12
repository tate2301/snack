import React from 'react';

function MaybeLaterIcon(props: { className?: string }) {
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
				d="M15.333 10.8l2.667 3m0 0l-2.667 3m2.667-3H7.2m0-7.2h10m4.4-.6v12a3.6 3.6 0 01-3.6 3.6H6A3.6 3.6 0 012.4 18V6A3.6 3.6 0 016 2.4h12A3.6 3.6 0 0121.6 6z"></path>
		</svg>
	);
}

export default MaybeLaterIcon;
