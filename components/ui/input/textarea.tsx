import { MutableRefObject, useEffect, useRef, useState } from 'react';

const Textarea = (props: {
	dualTone?: boolean;
	className?: string;
	placeholder?: string;
	autoFocus?: boolean;
	name: string;
	listeners?: Record<string, any>;
	[key: string]: any;
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
			ref={textAreaRef}
			style={{ resize: 'none', overflow: 'hidden' }}
			{...props}
			name={props.name}
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
