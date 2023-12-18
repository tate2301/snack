import { memo } from 'react';
import { useSFSymbol } from '../../lib/core/SFSymbols';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

function SFSymbol({
	name,
	...rest
}: {
	name: string;
	className?: string;
	color?: string;
	height?: string | number;
	width?: string | number;
	onClick?: (e) => void;
}) {
	const iconSrc = useSFSymbol(name, rest.color);
	return (
		<motion.img
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.1 }}
			onLoad={(e) => {
				e.currentTarget.style.opacity = '1';
			}}
			loading="lazy"
			crossOrigin="anonymous"
			referrerPolicy="no-referrer"
			decoding="async"
			draggable={false}
			onError={(e) => {
				e.currentTarget.src = iconSrc;
				e.currentTarget.onerror = null; // prevent infinite loop.
			}}
			src={iconSrc}
			alt={iconSrc ? name : ''}
			{...rest}
			className={cn('!w-6 !h-6', rest.className)}
		/>
	);
}
export default memo(SFSymbol);
