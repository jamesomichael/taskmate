import React from 'react';

const Input = ({
	type = 'text',
	placeholder = '',
	disabled = false,
	className,
}) => {
	return (
		<input
			disabled={disabled}
			type={type}
			placeholder={placeholder}
			className={`${
				disabled && 'hover:cursor-not-allowed opacity-50'
			} focus:outline-blue-600 focus:outline-2 rounded font-copy text-sm placeholder-gray-800 px-2 py-3 h-8 w-full outline outline-[1px] outline-gray-400 bg-gray-100 ${
				className || ''
			}`}
		/>
	);
};

export default Input;
