import { ReactNode, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';

function NavLink(props: { children: ReactNode; to: string }) {
	const { active } = useParams();
	const isActive = useMemo(() => {
		// deep compare href
		// @ts-ignore
		return active === props.to;
	}, [active, props.to]);
	return (
		<Link
			className={clsx(
				'relative px-4 py-1 rounded-xl',
				isActive && 'font-medium text-surface-12',
			)}
			style={{
				WebkitTapHighlightColor: 'transparent',
			}}
			to={props.to}>
			{isActive && (
				<motion.span
					layoutId="bubble"
					className="absolute inset-0 z-10 bg-surface-4 mix-blend-multiply rounded-xl"
					style={{ borderRadius: 9999 }}
					transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
				/>
			)}
			{props.children}
		</Link>
	);
}

export default NavLink;
