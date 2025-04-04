'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import AccountSettingsSection from './AccountSettingsSection';
import Input from '../shared/Input';

const AccountSettings = ({ displayName: initialDisplayName, email }) => {
	const [displayName, setDisplayName] = useState(initialDisplayName);
	const [isEditingProfile, setIsEditingProfile] = useState(true);
	const [isSavingProfile, setIsSavingProfile] = useState(false);
	const router = useRouter();

	const handleDisplayNameChange = (event) => {
		const name = event.target.value;
		setIsEditingProfile(true);
		setDisplayName(name);
	};

	const saveProfileChanges = async () => {
		if (displayName === initialDisplayName || displayName === '') {
			return;
		}

		setIsSavingProfile(true);
		await axios.patch('/api/account', {
			data: {
				display_name: displayName,
			},
		});
		setIsEditingProfile(false);
		setIsSavingProfile(false);
		router.refresh();
	};

	return (
		<div className="px-8 flex flex-col gap-14 mb-44">
			<AccountSettingsSection
				heading="Profile"
				isSaving={isSavingProfile}
				isUnsaved={isEditingProfile}
				onSave={saveProfileChanges}
			>
				<span className="font-copy font-bold">Display name</span>
				<Input
					onChange={handleDisplayNameChange}
					value={displayName}
					placeholder={displayName}
					maxLength={35}
				/>
			</AccountSettingsSection>
			<AccountSettingsSection heading="Email">
				<span className="font-copy font-bold">Current email</span>
				<span className="font-copy text-sm">
					Your current email address is&nbsp;
					<span className="font-bold">{email}</span>
				</span>
				<span className="mt-2 text-xs font-copy font-semibold">
					New email address
				</span>
				<Input
					disabled
					type="email"
					placeholder="Enter new email address"
				/>
			</AccountSettingsSection>
			<AccountSettingsSection heading="Security">
				<form
					className="flex flex-col gap-2 w-full"
					onSubmit={(e) => e.preventDefault()}
				>
					<span className="font-copy font-bold">
						Change your password
					</span>
					<span className="mt-1 text-xs font-copy font-semibold">
						Current password
					</span>
					<Input
						disabled
						type="password"
						placeholder="Enter current password"
						autoComplete="off"
					/>
					<span className="mt-1 text-xs font-copy font-semibold">
						New password
					</span>
					<Input
						disabled
						type="password"
						placeholder="Enter new password"
						autoComplete="off"
					/>
				</form>
			</AccountSettingsSection>
		</div>
	);
};

export default AccountSettings;
