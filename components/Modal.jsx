import React from 'react';

import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, children, width = 'max-w-md' }) => {
	if (!isOpen) {
		return null;
	}

	const handleBackdropClick = (e) => {
		if (e.target.id === 'backdrop') {
			onClose();
		}
	};

	return (
		<div
			id="backdrop"
			onClick={handleBackdropClick}
			className="z-50 fixed inset-0 flex items-start justify-center bg-black bg-opacity-75 px-4 py-12"
		>
			<div
				className={`relative bg-white p-6 rounded shadow-lg w-full ${width}`}
			>
				<button
					className="flex justify-center items-center absolute top-2 right-3 w-8 rounded aspect-square text-gray-500 hover:bg-gray-300 font-black font-copy"
					onClick={onClose}
				>
					<IoClose size={25} />
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
