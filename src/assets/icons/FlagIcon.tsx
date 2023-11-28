import React from 'react';

function FlagIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			fill="none"
			viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M2 22v-7m0 0V2l19 3C11.5 15.5 2 10.5 2 15z"></path>
		</svg>
	);
}

export default FlagIcon;
