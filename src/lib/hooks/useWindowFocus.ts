import { useContext } from 'react';
import { WindowFocusContext } from '../../context/WindowFocusContext';

const useWindowFocus = () => {
	const context = useContext(WindowFocusContext);

	if (!context) {
		throw new Error('useWindowFocus must be used within a WindowFocusProvider');
	}

	return context;
};

export default useWindowFocus;
