import { useCallback, useEffect, useState } from 'react';

export default function useToggle(
	initialValue: boolean,
	onChangeCallback?: (v: boolean) => void,
): [boolean, () => void, (v: boolean) => void, (v: boolean) => void] {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const toggle = useCallback(() => {
		onChangeCallback?.(!value);
		setValue((v) => !v);
	}, []);

	const setValueCallback = useCallback(
		(v: boolean) => {
			onChangeCallback?.(v);
			setValue(v);
		},
		[onChangeCallback],
	);

	return [value, toggle, setValue, setValueCallback];
}
