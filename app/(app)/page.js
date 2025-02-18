import React from 'react';

import { createClient } from '@/utils/supabase/server';
import { getBoards } from '@/services/database.service';

import { FaRegUser, FaRegStar } from 'react-icons/fa6';
import BoardsGrid from '@/components/BoardsGrid';

const fetchUserBoards = async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return { user: null, boards: [] };
	}

	const boards = await getBoards(user.id, supabase);
	return { user, boards };
};

const Homepage = async () => {
	const { user, boards } = await fetchUserBoards();
	const starredBoards = boards.filter((board) => board.is_starred);
	return (
		<div className="font-copy">
			<div className="max-w-screen-lg p-8 w-full m-auto flex flex-col gap-10">
				{starredBoards.length > 0 && (
					<div className="flex flex-col justify-center gap-3">
						<div className="flex items-center gap-3">
							<FaRegStar size={18} />
							<span className="font-bold">Starred boards</span>
						</div>
						<BoardsGrid
							boards={starredBoards}
							userId={user.id}
							allowCreate={false}
						/>
					</div>
				)}
				<div className="flex flex-col justify-center gap-3">
					<div className="flex items-center gap-3">
						<FaRegUser size={18} />
						<span className="font-bold">Your boards</span>
					</div>
					<BoardsGrid boards={boards} userId={user.id} />
				</div>
			</div>
		</div>
	);
};

export default Homepage;
