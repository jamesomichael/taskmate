import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

import { updateAccount } from '@/services/database.service';

const PATCH = async (request) => {
	try {
		const supabase = await createClient();
		const updates = await request.json();

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			console.error('No user found.');
			return NextResponse.json(
				{ message: 'User not authorised.' },
				{ status: 401 }
			);
		}

		await updateAccount(updates, supabase);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error updating account:', error);
		return NextResponse.json(
			{ message: 'Cannot update account.' },
			{ status: 500 }
		);
	}
};

export { PATCH };
