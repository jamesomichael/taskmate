import React from 'react';

import Loader from './Loader';

const AccountSettingsSection = ({
	heading,
	isSaving = false,
	isUnsaved,
	onSave,
	children,
}) => {
	return (
		<div className="flex flex-col gap-4">
			<span className="font-copy text-2xl font-semibold">{heading}</span>
			<div className="flex flex-col gap-2 items-start">
				{children}
				{isSaving ? (
					<div className="mt-3 w-24">
						<Loader size={6} />
					</div>
				) : isUnsaved ? (
					<button
						onClick={onSave}
						className="bg-blue-600 hover:bg-blue-700 px-4 py-2 font-copy text-sm font-medium mt-3 text-white rounded"
					>
						Save changes
					</button>
				) : null}
			</div>
		</div>
	);
};

export default AccountSettingsSection;
