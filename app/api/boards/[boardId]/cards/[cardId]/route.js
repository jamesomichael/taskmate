import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

import { updateCard, deleteCard } from '@/services/database.service';

const PATCH = async (request, { params }) => {
	const updates = await request.json();
	const { cardId } = await params;

	// TODO: Validate with joi.
	if (!cardId) {
		return NextResponse.json(
			{ message: 'Card ID is required.' },
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

		await updateCard(cardId, updates, supabase);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error updating card:', error.message);
		return NextResponse.json(
			{ message: 'Cannot update card.' },
			{ status: 500 }
		);
	}
};

const DELETE = async (request, { params }) => {
	const { cardId } = await params;

	// TODO: Validate with joi.
	if (!cardId) {
		return NextResponse.json(
			{ message: 'Card ID is required.' },
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

		await deleteCard(cardId, supabase);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error deleting card:', error.message);
		return NextResponse.json(
			{ message: 'Cannot delete card.' },
			{ status: 500 }
		);
	}
};

export { PATCH, DELETE };
