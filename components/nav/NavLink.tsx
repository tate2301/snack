import { ReactNode, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { motion } from 'framer-motion';

function NavLink(props: {
	children: ReactNode;
	href: Parameters<typeof Link>[0]['href'];
}) {
	const router = useRouter();
	const isActive = useMemo(() => {
		// deep compare href
		// @ts-ignore
		return router.query.active === props.href.query?.active;
	}, [router, props.href]);
	return (
		<Link
			className={clsx(
				'relative px-4 py-1 rounded-xl',
				isActive && 'font-semibold text-surface-12',
			)}
			style={{
				WebkitTapHighlightColor: 'transparent',
			}}
			href={props.href}>
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
