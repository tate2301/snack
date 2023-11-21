/**
 * This component allows type ahead in a select component. It uses the @radix-ui/select components
 * It accepts an array of objects with the following properties: label, value.
 * It also accepts a render prop which tells it how to render the list
 */

import React from 'react';

interface AutocompleteOption {
	label: string;
	value: string;
}

interface AutocompleteProps {
	options: AutocompleteOption[];
	renderOption: (option: AutocompleteOption) => React.ReactNode;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
	options,
	renderOption,
}) => {
	const [inputValue, setInputValue] = React.useState('');
	const [isOpen, setIsOpen] = React.useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleSelectOpen = () => {
		setIsOpen(true);
	};

	const handleSelectClose = () => {
		setIsOpen(false);
	};

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(inputValue.toLowerCase()),
	);

	return (
		<div>
			<select
				onClick={handleSelectOpen}
				onBlur={handleSelectClose}>
				{filteredOptions.map((option) => (
					<option
						key={option.value}
						value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{isOpen && (
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
				/>
			)}
		</div>
	);
};

export default Autocomplete;
