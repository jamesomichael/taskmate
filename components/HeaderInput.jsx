import React, { useState, useRef } from 'react';

const HeaderInput = ({ value: initialValue, onSave, className }) => {
	const [value, setValue] = useState(initialValue);
	const inputRef = useRef(null);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSave = () => {
		if (value.trim() !== '' && value !== initialValue) {
			onSave(value);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			inputRef.current?.blur();
		}
	};

	return (
		<input
			ref={inputRef}
			type="text"
			value={value}
			onChange={handleChange}
			onBlur={handleSave}
			onKeyDown={handleKeyDown}
			className={className}
		/>
	);
};

export default HeaderInput;
