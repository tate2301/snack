import React from 'react';

type KbdProps = {
	keys: Array<string | Keys>;
};

const metaKey = {
	win: 'Ctrl',
	mac: '⌘',
};

export enum Keys {
	Meta,
}

const Kbd = (props: KbdProps) => {
	return (
		<span className="text-surface-9">
			{props.keys.map((key, index) => (
				<>
					<kbd
						key={index}
						className="px-1.5 py-0.5 text-sm font-medium font-sans border border-zinc-400/20 shadow-xs bg-opacity-70 uppercase rounded-md inline-flex ml-1 w-fit gap-2">
						<span>{key === Keys.Meta ? metaKey.mac : key}</span>
					</kbd>
				</>
			))}
		</span>
	);
};

export default Kbd;
