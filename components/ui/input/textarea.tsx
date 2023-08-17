import { MutableRefObject, useEffect, useRef, useState } from 'react';

const Textarea = (props: {
	dualTone?: boolean;
	rows?: number;
	className?: string;
	placeholder?: string;
	autoFocus?: boolean;
	name: string;
	listeners?: Record<string, any>;
	[key: string]: any;
	setRef?: MutableRefObject<HTMLTextAreaElement>;
}) => {
	const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
	const [value, setValue] = useState('');

	const handleInputChange = (event) => {
		const inputValue = event.target.value;
		setValue(inputValue);
		adjustInputHeight();
	};

	const adjustInputHeight = () => {
		const input = textAreaRef.current;
		input.style.height = 'auto';
		input.style.height = `${input.scrollHeight}px`;
	};

	useEffect(() => {
		if (props.listeners) {
			Object.keys(props.listeners).forEach((key) => {
				const value = props.listeners[key];
				if (Array.isArray(value)) {
					value.forEach((val) => {
						textAreaRef.current?.addEventListener(key, val);
					});
					return;
				}
				textAreaRef.current?.addEventListener(key, props.listeners[key]);
			});
		}
		return () => {
			if (props.listeners) {
				Object.keys(props.listeners).forEach((key) => {
					textAreaRef.current?.removeEventListener(key, props.listeners[key]);
				});
			}
		};
	}, [props.listeners]);

	return (
		<textarea
			ref={(ref) => {
				textAreaRef.current = ref;
				if (props.setRef) {
					props.setRef.current = ref;
				}
			}}
			style={{ resize: 'none', overflow: 'hidden' }}
			{...props}
			name={props.name}
			rows={props.rows ?? 1}
			onChange={(e) => {
				handleInputChange(e);
				// @ts-ignore
				if (props.onChange) {
					// @ts-ignore
					props.onChange(e);
				}
			}}
		/>
	);
};

export default Textarea;
