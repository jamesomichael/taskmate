import React from 'react';

const AccountSettingsSection = ({ heading, isUnsaved, onSave, children }) => {
	return (
		<div className="flex flex-col gap-4">
			<span className="font-copy text-2xl font-semibold">{heading}</span>
			<div className="flex flex-col gap-2 items-start">
				{children}
				{isUnsaved && (
					<button
						onClick={onSave}
						className="bg-blue-600 hover:bg-blue-700 px-4 py-2 font-copy text-sm font-medium mt-3 text-white rounded"
					>
						Save changes
					</button>
				)}
			</div>
		</div>
	);
};

export default AccountSettingsSection;
