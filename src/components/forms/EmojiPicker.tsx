import { useState, useRef, useMemo, useEffect } from 'react';
import { electron } from '../../lib/core/electron';
import { ipcRenderer } from 'electron';
import clsx from 'clsx';

const EmojiPicker = (props: {
	onChange: (emoji: string) => void;
	value?: string;
	size?: 'xl' | 'md' | 'sm';
}) => {
	const [value, setvalue] = useState(props.value ? props.value : '🚀');
	const ref = useRef<HTMLInputElement>();
	const isEmojiPickerSupported = useMemo(() => {
		return electron.app.isEmojiPanelSupported();
	}, []);

	const onShowEmojiPicker = async () => {
		ipcRenderer.send('show-emoji-picker');
		if (!ref.current) return;
		ref.current.focus();
	};

	useEffect(() => {
		props.onChange(value);
	}, [value]);

	useEffect(() => {
		setvalue(props.value);
	}, [props.value]);

	const sizes = {
		xl: 'text-7xl',
		md: 'text-4xl',
		normal: '',
	};

	if (!isEmojiPickerSupported) return null;

	return (
		<button
			type="button"
			onClick={onShowEmojiPicker}
			className="py-1 px-2 flex items-center justify-center relative rounded-xl">
			<p className="w-full h-full z-10 absolute" />
			<p
				contentEditable
				onInput={(e) => {
					// @ts-ignore
					setvalue(e.nativeEvent.data);
					return e;
				}}
				className={clsx(
					'outline-none !w-fit text-2xl relative z-0 caret-transparent',
					props.size && sizes[props.size],
				)}
				ref={ref}>
				{value ?? '🎃'}
			</p>
		</button>
	);
};

export default EmojiPicker;
