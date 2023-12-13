import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

type Listener = {
	key: string;
	callback: (e: KeyboardEvent) => void;
};

type KeyboardNavigationContextType = {
	registerListeners: (listeners: Listener[]) => boolean;
	unregisterListeners: (listeners: Listener[]) => void;
	listeners: Listener[];
};

export const KeyboardNavigationContext =
	createContext<KeyboardNavigationContextType>({
		registerListeners: () => false,
		unregisterListeners: () => {},
		listeners: [],
	});

export const useKeyboardListeners = () => {
	const { registerListeners, unregisterListeners } = useContext(
		KeyboardNavigationContext,
	);

	return {
		registerListeners,
		unregisterListeners,
	};
};

export default function KeyboardNavigationContextProvider({ children }) {
	const [listeners, setListeners] = useState<
		Map<string, (e: KeyboardEvent) => void>
	>(new Map());

	const registerListeners = useCallback((newListeners: Listener[]) => {
		newListeners.forEach((listener) => {
			const callback = (event: KeyboardEvent) => {
				if (event.key === listener.key) {
					listener.callback(event);
				}
			};
			window.addEventListener('keydown', callback);
			listeners.set(listener.key, callback);
		});
		setListeners(new Map(listeners));

		return true;
	}, []);

	const unregisterListeners = useCallback((newListeners: Listener[]) => {
		newListeners.forEach((listener) => {
			const callback = listeners.get(listener.key);
			if (callback) {
				window.removeEventListener('keydown', callback);
				listeners.delete(listener.key);
			}
		});
		setListeners(new Map(listeners));
	}, []);

	const value = {
		registerListeners,
		unregisterListeners,
		listeners: Array.from(listeners.keys()).map((key) => ({
			key,
			callback: listeners.get(key)!,
		})),
	};

	useEffect(() => {
		return () => {
			listeners.forEach((callback, key) => {
				window.removeEventListener('keydown', callback);
			});
		};
	}, [listeners]);

	return (
		<KeyboardNavigationContext.Provider value={value}>
			{children}
		</KeyboardNavigationContext.Provider>
	);
}
