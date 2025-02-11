import React from 'react';

import { createClient } from '@/utils/supabase/server';

import { FaRegUser } from 'react-icons/fa6';
import BoardsGrid from '@/components/BoardsGrid';

const fetchUserBoards = async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return { user: null, boards: [] };
	}

	const { data: boards } = await supabase
		.from('boards')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	return { user, boards: boards || [] };
};

const Homepage = async () => {
	const { user, boards } = await fetchUserBoards();
	return (
		<div className="font-copy">
			<div className="max-w-screen-lg p-8 w-full m-auto">
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
