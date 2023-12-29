import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
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
		registerListeners: (evt) => {
			return true;
		},
		unregisterListeners: () => {},
		listeners: [],
	});

export const useKeyboardListeners = () => {
	const { registerListeners, unregisterListeners, listeners } = useContext(
		KeyboardNavigationContext,
	);

	return {
		registerListeners,
		unregisterListeners,
		listeners,
	};
};

export const useKeyboardShortcuts = (shortcuts: Array<Listener>) => {
	const { registerListeners, unregisterListeners } = useKeyboardListeners();

	const registeredShortcuts = useMemo(() => shortcuts, [shortcuts]);

	useEffect(() => {
		registerListeners(registeredShortcuts);
		return () => unregisterListeners(registeredShortcuts);
	}, [registeredShortcuts]);
};

export default function KeyboardNavigationContextProvider({ children }) {
	const [listeners, setListeners] = useState<
		Map<string, (e: KeyboardEvent) => void>
	>(new Map());
	const [registeredEvents, setRegisteredEvents] = useState<
		Map<string, boolean>
	>(new Map());

	const registerListeners = useCallback((newListeners: Listener[]) => {
		newListeners.forEach((listener) => {
			const callback = (event: KeyboardEvent) => {
				if (event.key === listener.key) {
					listener.callback(event);
				}
			};

			listeners.set(listener.key, callback);
			window.addEventListener('keydown', callback);
			setRegisteredEvents((events) => {
				events.set(listener.key, true);
				return events;
			});
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
				setRegisteredEvents((events) => {
					events.set(listener.key, false);
					return events;
				});
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

	console.log({ listeners, registeredEvents });

	return (
		<KeyboardNavigationContext.Provider value={value}>
			{children}
		</KeyboardNavigationContext.Provider>
	);
}
