import React from 'react';

type KbdProps = {
	keys: string[];
};
const Kbd = (props: KbdProps) => {
	return (
		<span className="text-surface-9">
			{props.keys.map((key, index) => (
				<>
					<kbd
						key={index}
						className="px-1 py-0.5 text-sm font-semibold font-sans border border-zinc-400/10 bg-opacity-5 uppercase rounded-md inline-flex ml-1 w-fit gap-2">
						<span>{key}</span>
					</kbd>
					{props.keys.length > 1 && index !== props.keys.length - 1 && (
						<span> +</span>
					)}
				</>
			))}
		</span>
	);
};

export default Kbd;
