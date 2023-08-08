import { useEffect, useRef, useState } from 'react';
import useCurrentTime from './useCurrentTime';
import { eachHourOfInterval, endOfToday, startOfToday } from 'date-fns';
import { remToPx } from '../lib/utils';

const useCalendarTime = () => {
	const currentTime = useCurrentTime();
	const container = useRef(null);
	const containerNav = useRef(null);
	const [timePosition, setTimePosition] = useState(0);

	const timeIntervals = eachHourOfInterval(
		{
			start: startOfToday(),
			end: endOfToday(),
		},
		{
			step: 1,
		},
	);

	useEffect(() => {
		// Set the container scroll position based on the current time.
		const currentMinute = currentTime.getHours() * 60;
		const blockHeight = remToPx(4);

		container.current.scrollTop =
			(currentMinute / 1380) * 2688 - 2 * blockHeight;
	}, []);

	return {
		container,
		containerNav,
		timeIntervals,
		timePosition,
		currentTime,
	};
};

export default useCalendarTime;
