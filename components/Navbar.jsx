import React from 'react';

import { createClient } from '@/utils/supabase/server';

const Navbar = async () => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	const user = data.user;

	return (
		<div className="h-full bg-neutral-900 grid grid-cols-2 items-center px-4 py-2">
			<div className="flex gap-4 h-full justify-start items-center">
				<span className="font-heading font-black text-gray-300 text-lg">
					task<span className="font-light text-gray-300">mate</span>
				</span>
				<button className="h-full bg-blue-400 px-2 rounded font-copy text-xs font-medium">
					Create
				</button>
			</div>
			<div className="flex justify-end items-center gap-4 h-full">
				<input
					type="text"
					placeholder="Search"
					className="px-3 h-full rounded bg-transparent outline outline-[1px] outline-gray-500 font-copy text-sm w-56"
				/>
				<div className="flex justify-center items-center h-full aspect-square rounded-full bg-blue-600 text-white">
					{user.email.charAt(0)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
