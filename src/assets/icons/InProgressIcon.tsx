import React from 'react';

function InProgressIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="24"
			fill="none"
			{...props}
			viewBox="0 0 24 24">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm7 11a7 7 0 01-7 7V5a7 7 0 017 7z"
				clipRule="evenodd"></path>
		</svg>
	);
}

export default InProgressIcon;
