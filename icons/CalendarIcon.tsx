import React from 'react';

function CalendarIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="24"
			fill="none"
			{...props}
			viewBox="0 0 25 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M4.125 8.571h15.75M6.161 2v1.714M17.625 2v1.714m3.375 3V19a3 3 0 01-3 3H6a3 3 0 01-3-3V6.714a3 3 0 013-3h12a3 3 0 013 3z"></path>
		</svg>
	);
}

export default CalendarIcon;
