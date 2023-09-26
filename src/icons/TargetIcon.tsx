import React from 'react';

function TargetIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="26"
			fill="none"
			{...props}
			viewBox="0 0 26 26">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				d="M13 5.2V1m0 24v-4.2m7.8-7.8H25M1 13h4.2m17.4 0a9.6 9.6 0 11-19.2 0 9.6 9.6 0 0119.2 0z"></path>
		</svg>
	);
}

export default TargetIcon;
