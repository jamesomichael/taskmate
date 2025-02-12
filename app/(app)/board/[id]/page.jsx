import React from 'react';

import { createClient } from '@/utils/supabase/server';
import { getBoardById, getLists } from '@/services/database.service';
import Board from '@/components/Board';

const BoardPage = async ({ params }) => {
	const { id } = await params;
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	const board = await getBoardById(id, user.id, supabase);
	const lists = await getLists(id, user.id, supabase);

	return !board ? (
		<div className="flex justify-center items-center h-full">
			<span className="font-heading">Board not found.</span>
		</div>
	) : (
		<Board board={board} lists={lists} />
	);
};

export default BoardPage;
