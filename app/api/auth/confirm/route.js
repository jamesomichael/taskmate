import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

const GET = async (request) => {
	const { searchParams } = new URL(request.url);
	const tokenHash = searchParams.get('token_hash');
	const type = searchParams.get('type');

	const redirectTo = request.nextUrl.clone();
	redirectTo.pathname = '/';
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('type');

	if (tokenHash && type) {
		const supabase = await createClient();
		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash: tokenHash,
		});
		if (!error) {
			redirectTo.searchParams.delete('next');
			return NextResponse.redirect(redirectTo);
		}
	}

	redirectTo.pathname = '/login';
	return NextResponse.redirect(redirectTo);
};

export { GET };
