import React from 'react';
import { createPortal } from 'react-dom';

import Modal from './Modal';

import { IoWarningOutline } from 'react-icons/io5';

const ConfirmModal = ({
	isOpen,
	onCancel,
	onConfirm,
	onClose,
	confirmationButtonText = 'Confirm',
	children,
}) => {
	return createPortal(
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 font-heading text-lg">
					<div className="flex justify-center items-center h-14 aspect-square bg-red-100 rounded-full">
						<IoWarningOutline size={30} className="text-red-700" />
					</div>
					<h2 className="text-black font-bold">Are you sure?</h2>
				</div>
				<p className="text-sm font-copy text-neutral-800">{children}</p>
				<div className="text-sm font-copy flex justify-end gap-2 mt-4">
					<button
						onClick={onCancel}
						className="px-4 py-2 hover:bg-gray-300 rounded"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
					>
						{confirmationButtonText}
					</button>
				</div>
			</div>
		</Modal>,
		document.body
	);
};

export default ConfirmModal;
