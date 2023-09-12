import React from 'react';

function TodoIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="24"
			fill="none"
			{...props}
			viewBox="0 0 24 24">
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="2"
			/>
		</svg>
	);
}

export default TodoIcon;
