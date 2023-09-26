import { useState, useRef, useMemo, useEffect } from 'react';
import { electron } from '../../lib/core/electron';

const EmojiPicker = (props: {
	onChange: (emoji: string) => void;
	value?: string;
}) => {
	const [value, setvalue] = useState(props.value ? props.value : '🚀');
	const ref = useRef<HTMLInputElement>();
	const isEmojiPickerSupported = useMemo(() => {
		return electron.app.isEmojiPanelSupported();
	}, []);

	const onShowEmojiPicker = async () => {
		await electron.app.showEmojiPanel();
		if (!ref.current) return;
		ref.current.focus();
	};

	useEffect(() => {
		props.onChange(value);
	}, [value]);

	useEffect(() => {
		setvalue(props.value);
	}, [props.value]);

	return (
		<button
			type="button"
			onClick={onShowEmojiPicker}
			className="py-1 px-2 flex items-center justify-center relative rounded-xl border border-surface-3">
			<p className="w-full h-full z-10 absolute" />
			<p
				contentEditable
				onInput={(e) => {
					// @ts-ignore
					setvalue(e.nativeEvent.data);
					return e;
				}}
				className="outline-none !w-fit text-2xl relative z-0 caret-transparent"
				ref={ref}>
				{value}
			</p>
		</button>
	);
};

export default EmojiPicker;
