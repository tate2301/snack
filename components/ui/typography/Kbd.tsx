type KbdProps = {
	keys: string[];
};
const Kbd = (props: KbdProps) => {
	return (
		<span>
			{props.keys.map((key, index) => (
				<kbd
					key={index}
					className='px-2 py-0.5 font-sans font-medium bg-surface-2 border border-surface-4 text-surface-11 rounded-md inline-flex ml-1 w-fit gap-2'>
					<span>{key}</span>
				</kbd>
			))}
		</span>
	);
};

export default Kbd;
