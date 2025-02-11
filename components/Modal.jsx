import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
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
			className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-4"
		>
			<div className="relative bg-white p-6 rounded shadow-lg max-w-md w-full">
				<button
					className="absolute top-2 right-3 w-8 rounded aspect-square text-gray-500 hover:bg-gray-300 font-black font-copy"
					onClick={onClose}
				>
					✕
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
