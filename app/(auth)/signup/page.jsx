import React from 'react';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

import { createAccount } from './actions';
import AccountForm from '@/components/AccountForm';

const SignUpPage = async () => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (!error && data.user) {
		redirect('/');
	}

	return (
		<div className="p-6 h-full">
			<AccountForm formAction={createAccount} type="signup" />
		</div>
	);
};

export default SignUpPage;
