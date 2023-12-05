import React from 'react';

function TrashIcon(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			{...props}
			viewBox="0 0 24 24">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M2.144 5.58A1.907 1.907 0 012 4.851c0-.878.589-1.514 1.168-1.925.605-.43 1.415-.775 2.327-1.049C7.331 1.327 9.807 1 12.5 1c2.693 0 5.169.326 7.005.877.912.274 1.722.62 2.327 1.049.58.41 1.168 1.047 1.168 1.925 0 .265-.053.508-.144.729l-2.957 12.573a5 5 0 01-4.867 3.856H9.968a5 5 0 01-4.867-3.856L2.144 5.58zM4.66 7.542l2.388 10.153a3 3 0 002.92 2.314h5.064a3 3 0 002.92-2.314L20.34 7.542c-.266.102-.545.196-.835.283-1.836.551-4.312.878-7.005.878-2.693 0-5.169-.327-7.005-.878-.29-.087-.569-.18-.835-.283zm16.317-2.708l-.012.051a1.303 1.303 0 01-.29.26c-.357.254-.937.522-1.745.765-1.602.48-3.876.793-6.43.793S7.672 6.39 6.07 5.91c-.808-.243-1.388-.511-1.745-.764a1.304 1.304 0 01-.29-.26l-.012-.052a1.21 1.21 0 01.302-.277c.357-.253.937-.522 1.745-.764C7.672 3.312 9.946 3 12.5 3s4.828.312 6.43.793c.808.242 1.388.511 1.745.764.184.13.266.225.302.277z"
				clipRule="evenodd"></path>
		</svg>
	);
}

export default TrashIcon;