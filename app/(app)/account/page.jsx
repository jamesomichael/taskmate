import React from 'react';

import { createClient } from '@/utils/supabase/server';

import AccountSettingsHeader from '@/components/AccountSettingsHeader';
import AccountSettings from '@/components/AccountSettings';

const AccountPage = async () => {
	const supabase = await createClient();
	const { data } = await supabase.auth.getUser();
	const user = data.user;

	const displayName = user?.user_metadata?.display_name;
	const email = user?.email;
	const createdAt = user?.created_at;

	return (
		<div className="max-w-screen-lg m-auto">
			<AccountSettingsHeader
				displayName={displayName}
				createdAt={createdAt}
			/>
			<AccountSettings displayName={displayName} email={email} />
		</div>
	);
};

export default AccountPage;
