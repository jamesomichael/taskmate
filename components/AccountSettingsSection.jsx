import React from 'react';

const AccountSettingsSection = ({ heading, children }) => {
	return (
		<div className="flex flex-col gap-4">
			<span className="font-copy text-2xl font-semibold">{heading}</span>
			<div className="flex flex-col gap-2 items-start">{children}</div>
		</div>
	);
};

export default AccountSettingsSection;
