import React from 'react';

function CalendarIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="24"
			fill="none"
			{...props}
			viewBox="0 0 24 24">
			<path
				d="M4.125 8.57139H19.875M6.16071 2V3.71449M17.625 2V3.71428M21 6.71428L21 19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V6.71428C3 5.05742 4.34315 3.71428 6 3.71428H18C19.6569 3.71428 21 5.05742 21 6.71428Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default CalendarIcon;
