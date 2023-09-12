import { useEffect, useState } from 'react';

const useCurrentTime = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	const updateTime = () => {
		setCurrentTime(new Date());
	};

	useEffect(() => {
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	return currentTime;
};

export default useCurrentTime;
