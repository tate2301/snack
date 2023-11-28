import useTimestampPosition from '../../../../lib/hooks/useTimestampPosition';

const Timestamp = () => {
	const timestampPosition = useTimestampPosition();

	return (
		<div
			className="absolute left-0 w-full gap-2 transition-transform duration-700 delay-300 !border-none"
			style={{ top: `${timestampPosition}%` }}>
			<p className="flex items-center flex-shrink-0 w-full group after:w-auto ">
				<button className="p-2 delay-100 duration-300 py-0.5 rounded bg-zinc-900">
					<span className="text-xs font-semibold text-right text-white uppercase rounded-full group-hover:flex">
						{Intl.DateTimeFormat('en-US', {
							hour: '2-digit',
							minute: 'numeric',
						}).format(new Date())}
					</span>
				</button>
				<span className="flex-1 h-[2px] bg-zinc-900" />
			</p>
		</div>
	);
};

export default Timestamp;
