import React from 'react';

function InboxIcon(props: { className?: string }) {
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
				strokeWidth={1.5}
				d="M2 14v4a4 4 0 004 4h12a4 4 0 004-4v-4M2 14V6a4 4 0 014-4h12a4 4 0 014 4v8M2 14h5.322c1.018 0 1.938.607 2.339 1.542v0c.881 2.057 3.797 2.057 4.678 0v0A2.545 2.545 0 0116.678 14H22"></path>
		</svg>
	);
}

export default InboxIcon;
