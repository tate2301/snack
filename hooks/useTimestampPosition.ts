import { useEffect, useState } from 'react';
import { HOUR_HEIGHT } from '../constants/styles';

// Take current time and express it as percentage of 24 hours
const useTimestampPosition = () => {
	const [timePosition, setTimePosition] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			const totalHeight = HOUR_HEIGHT * 24;
			const now = new Date();
			const hours = now.getHours();
			const minutes = now.getMinutes();

			const timeInMinutes = hours * 60 + minutes;
			const percentage = (timeInMinutes / 1440) * 100;
			setTimePosition(percentage);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return timePosition;
};

export default useTimestampPosition;
