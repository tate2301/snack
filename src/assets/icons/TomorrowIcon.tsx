import React from 'react';

function TomorrowIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			viewBox="0 0 24 24">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7 2a1 1 0 00-1 1v2a4 4 0 00-4 4v9a4 4 0 004 4h12a4 4 0 004-4V9a4 4 0 00-4-4V3a1 1 0 10-2 0v2H8V3a1 1 0 00-1-1zM6 7h12a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2zm8.425 2.559a.75.75 0 10-1.213.882l1.315 1.809H8a.75.75 0 000 1.5h6.527l-1.315 1.809a.75.75 0 001.213.882l2.182-3a.75.75 0 000-.882l-2.182-3z"
				clipRule="evenodd"></path>
		</svg>
	);
}

export default TomorrowIcon;
