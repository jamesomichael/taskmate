'use client';
import React, { useEffect } from 'react';

import { FaRegUser, FaRegStar } from 'react-icons/fa6';
import BoardsGrid from '@/components/BoardsGrid';

import useBoardStore from '@/stores/boardStore';
import Loader from '@/components/Loader';

const Homepage = () => {
	const { getBoards, boards, isLoadingBoards } = useBoardStore();

	useEffect(() => {
		getBoards();
	}, [getBoards]);

	const starredBoards = boards.filter((board) => board.is_starred);

	return isLoadingBoards ? (
		<Loader />
	) : (
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
							allowCreate={false}
						/>
					</div>
				)}
				<div className="flex flex-col justify-center gap-3">
					<div className="flex items-center gap-3">
						<FaRegUser size={18} />
						<span className="font-bold">Your boards</span>
					</div>
					<BoardsGrid boards={boards} />
				</div>
			</div>
		</div>
	);
};

export default Homepage;
