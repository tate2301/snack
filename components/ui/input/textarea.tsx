import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const Textarea = forwardRef((props, ref) => {
	const [value, setValue] = useState('');
	const inputRef = useRef(null);

	const handleInputChange = (event) => {
		setValue(event.target.value);
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
		<textarea
			ref={inputRef}
			value={value}
			onChange={handleInputChange}
			style={{ resize: 'none', overflow: 'hidden' }}
			{...props}
		/>
	);
});


export default Textarea;
