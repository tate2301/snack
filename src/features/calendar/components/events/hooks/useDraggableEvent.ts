import { useEffect, useState } from 'react';

const useDraggableEvent = (startY: number, endY: number) => {
	const [y, setY] = useState({ start: startY, end: endY });

	useEffect(() => {
		// We want to block the render until we have this
		setY({ start: startY, end: endY });
	}, [startY, endY]);

	const handleDrag = (e, { deltaY }) => {
		// Update the width based on the drag distance
		setY((prevY) => ({
			start: prevY.start + deltaY,
			end: prevY.end + deltaY,
		}));

		e.stopPropagation();
	};

	return { y, handleDrag };
};
export default useDraggableEvent;
