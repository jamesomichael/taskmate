'use server';
import { createClient } from '@/utils/supabase/server';

const createAccount = async (formData) => {
	const supabase = await createClient();
	const email = formData.get('email');
	const displayName = formData.get('name');
	const password = formData.get('password');
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { display_name: displayName } },
	});
	if (!error && data.user?.identities?.length === 0) {
		return {
			success: false,
			email,
			error: new Error(
				'An account already exists for this email address.'
			),
		};
	}
	return { success: !!!error, email, error };
};

export { createAccount };
