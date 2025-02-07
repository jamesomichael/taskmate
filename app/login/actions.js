'use server';
import { createClient } from '@/utils/supabase/server';

const login = async (formData) => {
	const supabase = await createClient();
	const email = formData.get('email');
	const password = formData.get('password');
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	return { success: !!!error, email, error };
};

export { login };
