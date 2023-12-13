import React from 'react';

type KbdProps = {
	keys: string[];
};
const Kbd = (props: KbdProps) => {
	return (
		<span>
			{props.keys.map((key, index) => (
				<kbd
					key={index}
					className="px-2 py-0.5 text-sm font-semibold mix-blend-overlay bg-opacity-5 text-surface-9 rounded-md inline-flex ml-1 w-fit gap-2">
					<span>{key}</span>
				</kbd>
			))}
		</span>
	);
};

export default Kbd;
