import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import useToggle from '../../../lib/hooks/useToggle';
import { cn } from '../../../lib/utils';
import useClickOutside from '../../../lib/hooks/useClickOutside';

type ClickableProps = {
	children: ReactNode;
	menu?: (isOpen: boolean, onClose: () => void) => ReactNode;
	className?: string;
	action?: () => void;
	[key: string]: any;
};

const Clickable = (props: ClickableProps) => {
	const [isFocused, toggleFocused, setIsFocused] = useToggle(false);
	const [isContextMenuOpen, toggleIsContextMenuOpen] = useToggle(false);

	// Use ref to remove focus when clicked outside
	const ref = useRef();
	useClickOutside(ref, () => setIsFocused(false));

	const onDoubleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (props.action) props.action();
	};

	const onClick = () => {
		if (props.onFocusCb) {
			props.onFocusCb(!isFocused);
		}

		toggleFocused();
	};

	return (
		<>
			<motion.div
				{...getElementProps(props)}
				onDoubleClick={onDoubleClick}
				onContextMenu={toggleIsContextMenuOpen}
				onClick={onClick}
				className={cn('', props.className, isFocused && 'bg-surface-3')}
				ref={ref}>
				{props.menu && props.menu(isContextMenuOpen, toggleIsContextMenuOpen)}
				{props.children}
			</motion.div>
		</>
	);
};

const getElementProps = (props: ClickableProps) => {
	const initialProps = { ...props };
	delete initialProps.action;
	delete initialProps.menu;

	return props;
};

export default Clickable;
