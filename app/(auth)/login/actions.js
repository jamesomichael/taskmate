'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const login = async (formData) => {
	const supabase = await createClient();
	const email = formData.get('email');
	const password = formData.get('password');
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (!error) {
		redirect('/');
	}

	return { success: !!!error, email, error };
};

export { login };
