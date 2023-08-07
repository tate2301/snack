import { useEffect, useState } from 'react';

// Take current time and express it as percentage of 24 hours
const useTimestampPosition = () => {
	const [timePosition, setTimePosition] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const hours = now.getHours();
			const minutes = now.getMinutes();
			const seconds = now.getSeconds();
			const totalSeconds = hours * 60 + minutes;
			const percentage = (totalSeconds / 1920) * 100;
			setTimePosition(percentage);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return timePosition;
};

export default useTimestampPosition;
