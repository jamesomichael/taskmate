import React from 'react';
import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';
import {
	getBoardById,
	getLists,
	createList,
} from '@/services/database.service';
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
		// <div
		// 	className={`grid grid-rows-[auto,1fr] bg-gradient-to-br ${board.background} h-full overflow-hidden w-full`}
		// >
		// 	<div className="h-14 bg-black bg-opacity-45 flex items-center px-4">
		// 		<span className="font-copy font-semibold text-white text-lg">
		// 			{board.name}
		// 		</span>
		// 	</div>
		// 	<div className="p-3 flex gap-3 w-full overflow-x-scroll">
		// 		{lists.map((list) => (
		// 			<List boardId={board.id} list={list} />
		// 		))}
		// 		<AddList boardId={board.id} onCreate={handleListCreation} />
		// 	</div>
		// </div>
	);
};

export default BoardPage;
