type KbdProps = {
	keys: string[];
};
const Kbd = (props: KbdProps) => {
	return (
		<span>
			{props.keys.map((key, index) => (
				<kbd
					key={index}
					className="px-2 py-0.5 text-sm font-medium bg-surface-2 mix-blend-luminosity text-surface-11 rounded-md inline-flex ml-1 w-fit gap-2">
					<span>{key}</span>
				</kbd>
			))}
		</span>
	);
};

export default Kbd;
