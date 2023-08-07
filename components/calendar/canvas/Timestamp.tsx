const Timestamp = (props: { position: number }) => {
	return (
		<div
			className="absolute left-0 z-20 w-full gap-2 border-none"
			style={{ top: `${props.position}px` }}>
			<p className="flex items-center flex-shrink-0 w-full after:w-auto after:flex-1 after:h-[2px] after:bg-zinc-900 text-zinc-900">
				<span className="w-24 px-4 text-xs font-semibold text-right uppercase bg-white rounded">
					{Intl.DateTimeFormat('en-US', {
						hour: '2-digit',
						minute: 'numeric',
					}).format(new Date())}
				</span>
			</p>
		</div>
	);
};

export default Timestamp;
