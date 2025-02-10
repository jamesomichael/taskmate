import React from 'react';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

import { login } from './actions';
import AccountForm from '@/components/AccountForm';

const LoginPage = async () => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (!error && data.user) {
		redirect('/');
	}

	return (
		<div className="p-6 h-full">
			<AccountForm formAction={login} type="login" />
		</div>
	);
};

export default LoginPage;
