import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

import {
	getBoardById,
	updateBoard,
	deleteBoard,
	getLists,
	getCards,
} from '@/services/database.service';

const GET = async (request, { params }) => {
	const { id } = await params;

	// TODO: Validate with joi.
	if (!id) {
		return NextResponse.json(
			{ message: 'Board ID is required.' },
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
		const board = await getBoardById(id, user.id, supabase);

		if (!board) {
			return NextResponse.json(
				{ message: 'Board not found.' },
				{ status: 404 }
			);
		}

		const lists = await getLists(id, user.id, supabase);
		const cards = await getCards(id, user.id, supabase);

		return NextResponse.json({
			...board,
			lists: lists?.map((list) => ({
				...list,
				cards: cards?.filter((card) => card.list_id === list.id),
			})),
		});
	} catch (error) {
		console.error('Error fetching board:', error.message);
		return NextResponse.json(
			{ message: 'Cannot get board.' },
			{ status: 500 }
		);
	}
};

const PATCH = async (request, { params }) => {
	const { id } = await params;
	const updates = await request.json();

	// TODO: Validate with joi.
	if (!id) {
		return NextResponse.json(
			{ message: 'Board ID is required.' },
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

		await updateBoard(id, updates, supabase);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error updating board:', error.message);
		return NextResponse.json(
			{ message: 'Cannot update board.' },
			{ status: 500 }
		);
	}
};

const DELETE = async (request, { params }) => {
	const { id } = await params;

	if (!id) {
		return NextResponse.json(
			{ message: 'Board ID is required.' },
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

		await deleteBoard(id, supabase);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error deleting board:', error.message);
		return NextResponse.json(
			{ message: 'Cannot delete board.' },
			{ status: 500 }
		);
	}
};

export { GET, PATCH, DELETE };
