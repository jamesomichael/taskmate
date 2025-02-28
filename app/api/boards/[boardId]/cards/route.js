import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

import { createCard, updateCards } from '@/services/database.service';

const POST = async (request, { params }) => {
	const { title, listId, index } = await request.json();
	const { boardId } = await params;

	// TODO: Validate with joi.
	if (!title || !listId || !boardId) {
		return NextResponse.json(
			{ message: 'Title, list ID, and board ID are required.' },
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

		const card = await createCard(
			title,
			index,
			listId,
			boardId,
			user.id,
			supabase
		);
		return NextResponse.json(card);
	} catch (error) {
		console.error('Error creating card:', error.message);
		return NextResponse.json(
			{ message: 'Cannot create card.' },
			{ status: 500 }
		);
	}
};

const PATCH = async (request) => {
	const updates = await request.json();

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

		await updateCards(updates, supabase);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error updating cards:', error.message);
		return NextResponse.json(
			{ message: 'Cannot update cards.' },
			{ status: 500 }
		);
	}
};

export { POST, PATCH };
