import { useState, useEffect } from 'react';
import { HOUR_HEIGHT } from '../../../../constants/styles';

const useResizableEvent = (event_height: number) => {
	const [height, setHeight] = useState(0);

	useEffect(() => {
		setHeight(event_height);
	}, [event_height]);

	const handleResize = (e, { size }) => {
		// We have 5 minute intervals in 1hr. 1hr = 80px
		const snapGrid = HOUR_HEIGHT / 12;
		setHeight((size.height * snapGrid) / 5);
	};

	return { height, handleResize };
};

export default useResizableEvent;
