import React from "react";

import { XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

type TagInputProps = {
	onChange: (tags: string[]) => void;
	value: string[];
};

const TagInput = (props: TagInputProps) => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleInputKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag();
		} else if (e.key === 'Backspace' && inputValue === '') {
			removeTag(props.value.length - 1);
		}
	};

	const addTag = () => {
		const newTag = inputValue.trim();
		if (newTag !== '') {
			props.onChange(Array.from(new Set([...props.value, newTag])));
			setInputValue('');
		}
	};

	const removeTag = (index) => {
		const newTags = [...props.value];
		newTags.splice(index, 1);
		props.onChange(newTags);
	};

	return (
		<div className="inline-flex flex-wrap w-full max-w-full gap-2 bg-white rounded-lg">
			{props.value.map((tag, index) => (
				<p
					key={index}
					onClick={() => removeTag(index)}
					className="flex items-center px-2 py-1 text-sm rounded-xl bg-accent-10 text-white">
					{tag}
					
				</p>
			))}
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				placeholder="Type tags separated by commas"
				className="flex-1 bg-transparent outline-none"
				autoFocus
			/>
		</div>
	);
};

export default TagInput;
