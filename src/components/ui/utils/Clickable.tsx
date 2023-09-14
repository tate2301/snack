import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import useToggle from '../../../hooks/useToggle';
import { cn } from '../../../lib/utils';
import useClickOutside from '../../../hooks/useClickOutside';

type ClickableProps = {
	children: ReactNode;
	menu?: ReactNode;
	className?: string;
	action?: () => void;
	[key: string]: any;
};

const Clickable = (props: ClickableProps) => {
	const [isFocused, toggleFocused, setIsFocused] = useToggle(false);

	// Use ref to remove focus when clicked outside
	const ref = useRef();
	useClickOutside(ref, () => setIsFocused(false));

	const onDoubleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (props.action) props.action();
	};

	return (
		<motion.div
			{...getElementProps(props)}
			onDoubleClick={onDoubleClick}
			onContextMenu={() => {
				console.log('Context menu');
			}}
			onClick={toggleFocused}
			className={cn('', props.className, isFocused && 'ring-2 ring-accent-9')}
			children={props.children}
			ref={ref}
		/>
	);
};

const getElementProps = (props: ClickableProps) => {
	const initialProps = { ...props };
	delete initialProps.action;
	delete initialProps.menu;

	return props;
};

export default Clickable;
