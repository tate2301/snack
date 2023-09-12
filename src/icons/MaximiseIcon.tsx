import React from 'react';

function MaximiseIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			{...props}
			fill="none"
			viewBox="0 0 24 24">
			<path
				d="M4 20V4H20V20H4Z"
				stroke="currentColor"
				strokeWidth="1"
			/>
		</svg>
	);
}

export default MaximiseIcon;
