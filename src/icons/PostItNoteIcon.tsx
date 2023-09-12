import React from 'react';

function PostItNoteIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			{...props}
			fill="none"
			viewBox="0 0 24 24">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M6 1a5 5 0 00-5 5v12a5 5 0 005 5h12a5 5 0 005-5V6a5 5 0 00-5-5H6zM3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14 2a1 1 0 100-2H7a1 1 0 100 2h10zm-3 3a1 1 0 01-1 1H7a1 1 0 110-2h6a1 1 0 011 1zm-3 5a1 1 0 100-2H7a1 1 0 100 2h4z"
				clipRule="evenodd"></path>
		</svg>
	);
}

export default PostItNoteIcon;
