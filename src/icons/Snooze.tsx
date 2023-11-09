import React from 'react';

function SnoozeIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			viewBox="0 0 24 24">
			<g
				fill="none"
				fillRule="evenodd"
				stroke="none"
				strokeWidth="2">
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="2"
					d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2"></path>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10.0050559 14.0130331L12 12 12 8.04315046"
					opacity="0.9"></path>
				<g
					fill="currentColor"
					fillRule="nonzero"
					transform="translate(15.157 1.747)">
					<path d="M5.879 1.976L2.46 5.796h3.657c.296 0 .52.07.67.21.15.138.226.317.226.536 0 .21-.074.38-.222.513-.149.132-.373.198-.674.198H1.06c-.356 0-.621-.078-.797-.232C.088 6.866 0 6.654 0 6.385c0-.16.062-.32.185-.482.123-.162.378-.46.765-.892.41-.456.783-.868 1.118-1.238.335-.369.646-.714.933-1.035.287-.321.525-.594.714-.817.19-.223.341-.415.455-.574H1.395c-.383 0-.673-.034-.869-.103C.33 1.176.232.996.232.704.232.49.306.32.455.191.603.064.813 0 1.087 0h4.286c.397 0 .7.058.913.174.212.117.318.325.318.626 0 .1-.021.204-.062.31a1.128 1.128 0 01-.137.264c-.05.068-.118.152-.205.25a17.96 17.96 0 01-.321.352z"></path>
				</g>
			</g>
		</svg>
	);
}

export default SnoozeIcon;
