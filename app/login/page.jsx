import React from 'react';

import { login } from './actions';
import AccountForm from '@/components/AccountForm';

const LoginPage = () => {
	return (
		<div className="p-6 h-full">
			<AccountForm formAction={login} type="login" />
		</div>
	);
};

export default LoginPage;
