import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

const POST = async () => {
	try {
		const supabase = await createClient();
		const { error } = await supabase.auth.signOut();

		if (error) {
			return NextResponse.json(
				{ message: error.message },
				{ status: 400 }
			);
		}

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error logging out:', error);
		return NextResponse.json(
			{ message: 'Cannot log out.' },
			{ status: 500 }
		);
	}
};

export { POST };
