import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

import { createComment } from '@/services/database.service';

const POST = async (request, { params }) => {
	const { text } = await request.json();
	const { boardId, cardId } = await params;

	// TODO: Validate with joi.
	if (!text || !cardId || !boardId) {
		return NextResponse.json(
			{ message: 'Text, card ID, and board ID are required.' },
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

		const comment = await createComment(
			text,
			cardId,
			boardId,
			user.id,
			supabase
		);
		return NextResponse.json(comment);
	} catch (error) {
		console.error('Error creating comment:', error.message);
		return NextResponse.json(
			{ message: 'Cannot create comment.' },
			{ status: 500 }
		);
	}
};

export { POST };
