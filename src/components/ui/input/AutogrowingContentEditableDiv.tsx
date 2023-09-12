import React from "react";

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const AutogrowingContentEditableDiv = forwardRef((props, ref) => {
	const [value, setValue] = useState('');
	const inputRef = useRef(null);

	const handleInputChange = (event) => {
		const inputValue = event.target.value;
		const lines = inputValue?.split('\n') ?? [];

		const updatedLines = lines.map((line, index) => {
			if (index === lines.length - 1 && event.nativeEvent.shiftKey) {
				return `<span class='text-warning-11'>${line}</span>`;
			}
			return line;
		});

		const updatedValue = updatedLines.join('\n');
		setValue(updatedValue);
		adjustInputHeight();
	};

	const adjustInputHeight = () => {
		const input = inputRef.current;
		input.style.height = 'auto';
		input.style.height = `${input.scrollHeight}px`;
	};

	useImperativeHandle(ref, () => ({
		getValue: () => value,
		setValue: (newValue) => {
			setValue(newValue);
			adjustInputHeight();
		},
	}));

	return (
		<div
			contentEditable
			ref={inputRef}
			dangerouslySetInnerHTML={{ __html: value }}
			onInput={handleInputChange}
			style={{ resize: 'none', overflow: 'hidden', whiteSpace: 'pre-wrap' }}
			{...props}
		/>
	);
});

export default AutogrowingContentEditableDiv;