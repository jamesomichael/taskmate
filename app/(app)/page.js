import React from 'react';
import Link from 'next/link';

import { createClient } from '@/utils/supabase/server';

import { FaRegUser } from 'react-icons/fa6';

const Homepage = async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: boards } = await supabase
		.from('boards')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	return (
		<div className="font-copy">
			<div className="max-w-screen-lg p-8 w-full m-auto">
				<div className="flex flex-col justify-center gap-3">
					<div className="flex items-center gap-3">
						<FaRegUser size={18} />
						<span className="font-bold">Your boards</span>
					</div>
					<div className="grid grid-cols-5 gap-6">
						{boards.map((board) => {
							return (
								<Link
									href={`/board/${board.id}`}
									key={board.id}
									className="w-44 aspect-video rounded bg-gradient-to-br from-indigo-700 to-pink-700 flex p-2 hover:from-indigo-800 hover:to-pink-800"
								>
									<span className="text-white font-bold">
										{board.name}
									</span>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
