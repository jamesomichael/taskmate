import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { updateList, deleteList } from '@/services/database.service';

const PATCH = async (request, { params }) => {
	const updates = await request.json();
	const { listId } = await params;

	// TODO: Validate with joi.
	if (!listId) {
		return NextResponse.json(
			{ message: 'List ID is required.' },
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

		await updateList(listId, updates, supabase);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error updating list:', error.message);
		return NextResponse.json(
			{ message: 'Cannot update list.' },
			{ status: 500 }
		);
	}
};

const DELETE = async (request, { params }) => {
	const { listId } = await params;

	if (!listId) {
		return NextResponse.json(
			{ message: 'List ID is required.' },
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

		await deleteList(listId, supabase);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error deleting list:', error.message);
		return NextResponse.json(
			{ message: 'Cannot delete list.' },
			{ status: 500 }
		);
	}
};

export { PATCH, DELETE };
