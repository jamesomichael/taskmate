import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

import { getBoards, createBoard } from '@/services/database.service';

export const dynamic = 'force-dynamic';

const GET = async () => {
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

		const boards = await getBoards(user.id, supabase);
		return NextResponse.json(boards, {
			headers: {
				'Cache-Control':
					'no-store, no-cache, must-revalidate, proxy-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		});
	} catch (error) {
		console.error('Error fetching boards:', error.message);
		return NextResponse.json(
			{ message: 'Cannot get boards.' },
			{ status: 500 }
		);
	}
};

const POST = async (request) => {
	const { name, background } = await request.json();

	// TODO: Validate with joi.
	if (!name || !background) {
		return NextResponse.json(
			{ message: 'Name and background are required.' },
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

		const board = await createBoard(name, background, user.id, supabase);
		return NextResponse.json(board);
	} catch (error) {
		console.error('Error creating board:', error.message);
		return NextResponse.json(
			{ message: 'Cannot create board.' },
			{ status: 500 }
		);
	}
};

export { GET, POST };
