import React from 'react';

function TagsIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			{...props}
			viewBox="0 0 21 21">
			<g
				fill="none"
				fillRule="evenodd"
				strokeWidth={1}
				transform="translate(1 3)">
				<path
					d="m11.9142136.5h3.5857864c1.1045695 0 2 .8954305 2 2v3.58578644c0 .26521649-.1053568.5195704-.2928932.70710678l-6.7928932 6.79289318c-.78104862.7810486-2.04737858.7810486-2.82842716 0l-3.17157288-3.1715728c-.78104858-.78104862-.78104858-2.04737858 0-2.82842716l6.79289324-6.79289322c.1875364-.18753638.4418903-.29289322.7071068-.29289322z"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1}
				/>
				<path
					d="m7.5 13.5-2.01296191 1.006481c-.98795699.4939785-2.18930307.0935298-2.68328157-.8944272-.03127543-.0625509-.05924851-.1266991-.08380397-.1921803l-1.61484253-4.30624679c-.34775942-.92735845.03559029-1.96957132.90137249-2.45056144l7.49351749-4.16306527"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<rect
					fill="currentColor"
					height="2"
					rx="1"
					width="2"
					x="14"
					y="2"
				/>
			</g>
		</svg>
	);
}

export default TagsIcon;
