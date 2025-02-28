import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

import { createList } from '@/services/database.service';

const POST = async (request, { params }) => {
	const { name } = await request.json();
	const { boardId } = await params;

	// TODO: Validate with joi.
	if (!name || !boardId) {
		return NextResponse.json(
			{ message: 'Name and board ID are required.' },
			{ status: 400 }
		);
	}

	try {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			console.error('No user found.');
			return NextResponse.json(
				{ message: 'No user found.' },
				{ status: 404 }
			);
		}

		const list = await createList(name, boardId, null, user.id, supabase);

		return NextResponse.json(list);
	} catch (error) {
		console.error('Error creating list:', error.message);
		return NextResponse.json(
			{ message: 'Cannot create list.' },
			{ status: 500 }
		);
	}
};

export { POST };
