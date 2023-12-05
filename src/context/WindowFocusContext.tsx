import { createContext, useState, useEffect, ReactNode, FC } from 'react';

interface WindowFocusContextProps {
	isWindowFocused: boolean;
	setWindowFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WindowFocusContext = createContext<
	WindowFocusContextProps | undefined
>(undefined);

export const WindowFocusProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isWindowFocused, setWindowFocused] = useState(true);

	useEffect(() => {
		window.addEventListener('focus', () => setWindowFocused(true));
		window.addEventListener('blur', () => setWindowFocused(false));

		return () => {
			window.removeEventListener('focus', () => setWindowFocused(true));
			window.removeEventListener('blur', () => setWindowFocused(false));
		};
	}, []);

	return (
		<WindowFocusContext.Provider value={{ isWindowFocused, setWindowFocused }}>
			{children}
		</WindowFocusContext.Provider>
	);
};
