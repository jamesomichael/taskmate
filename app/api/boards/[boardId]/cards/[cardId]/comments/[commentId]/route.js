import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

import { deleteComment } from '@/services/database.service';

const DELETE = async (request, { params }) => {
	const { commentId } = await params;

	// TODO: Validate with joi.
	if (!commentId) {
		return NextResponse.json(
			{ message: 'Comment ID is required.' },
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

		await deleteComment(commentId, supabase);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error deleting comment:', error.message);
		return NextResponse.json(
			{ message: 'Cannot delete comment.' },
			{ status: 500 }
		);
	}
};

export { DELETE };
