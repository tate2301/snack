// Divider component
const Divider: React.FC<{
	direction?: 'horizontal' | 'vertical';
	color?: string;
}> = ({ direction, color }) => {
	return (
		<div
			className={`${
				direction === 'horizontal' ? 'border-t w-full' : 'border-l h-full'
			} ${color}`}></div>
	);
};

export default Divider;
