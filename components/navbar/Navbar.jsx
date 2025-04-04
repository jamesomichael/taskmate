'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Search from '../shared/Search';
import AccountDropdown from './AccountDropdown';

import useBoardStore from '@/stores/boardStore';
import useAuthStore from '@/stores/authStore';

const Navbar = ({ user }) => {
	const { board } = useBoardStore();
	const { setUser } = useAuthStore();
	const pathname = usePathname();

	useEffect(() => {
		setUser(user);
	}, [user]);

	const isBoardPage = pathname.startsWith('/board/');

	return (
		<div
			className={`relative h-full grid grid-cols-2 gap-3 items-center border-b-[1px] px-4 py-2 ${
				board?.background && isBoardPage
					? `bg-gradient-to-br ${board.background} border-neutral-500`
					: 'bg-white border-neutral-300'
			}`}
		>
			{board?.background && isBoardPage && (
				<div className="absolute inset-0 bg-black w-full bg-opacity-80 group-hover:bg-opacity-50"></div>
			)}

			<div className="relative flex gap-4 h-full justify-start items-center">
				<Link
					href="/"
					className={`font-heading font-black ${
						board?.background && isBoardPage
							? `text-white`
							: 'text-gray-600 hover:text-gray-500'
					} text-lg`}
				>
					task<span className="font-light">mate</span>
				</Link>
				{/* <button className="h-full bg-blue-600 text-white px-2 rounded font-copy text-xs font-medium">
					Create
				</button> */}
			</div>
			<div className="relative flex justify-end items-center gap-4 h-full">
				{/* <Search /> */}
				<AccountDropdown logOut={() => {}} user={user} />
			</div>
		</div>
	);
};

export default Navbar;
