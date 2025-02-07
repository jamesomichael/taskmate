import React from 'react';

import { createAccount } from './actions';
import AccountForm from '@/components/AccountForm';

const SignUpPage = () => {
	return (
		<div className="p-6 h-full">
			<AccountForm formAction={createAccount} type="signup" />
		</div>
	);
};

export default SignUpPage;
