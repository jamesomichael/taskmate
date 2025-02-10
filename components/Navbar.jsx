import React from 'react';
import { redirect } from 'next/navigation';

import Search from './Search';
import AccountDropdown from './AccountDropdown';

import { createClient } from '@/utils/supabase/server';

const handleLogOut = async () => {
	'use server';
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect('/login');
};

const Navbar = async () => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	const user = data.user;

	return (
		<div className="h-full bg-white grid grid-cols-2 gap-3 items-center px-4 py-2">
			<div className="flex gap-4 h-full justify-start items-center">
				<span className="font-heading font-black text-gray-600 text-lg">
					task<span className="font-light text-gray-600">mate</span>
				</span>
				<button className="h-full bg-blue-600 text-white px-2 rounded font-copy text-xs font-medium">
					Create
				</button>
			</div>
			<div className="flex justify-end items-center gap-4 h-full">
				<Search />
				<AccountDropdown logOut={handleLogOut} user={user} />
			</div>
		</div>
	);
};

export default Navbar;
