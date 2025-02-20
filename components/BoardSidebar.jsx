'use client';
import React, { useEffect } from 'react';

import useBoardStore from '@/stores/boardStore';
import Link from 'next/link';
import { FaRegStar, FaStar } from 'react-icons/fa6';

const BoardSidebar = ({ activeBoardId }) => {
	const { boards, getBoards, updateBoard } = useBoardStore();

	useEffect(() => {
		getBoards();
	}, [getBoards]);

	const toggleStarredStatus = async (e, board) => {
		e.preventDefault();
		updateBoard(board.id, { is_starred: !board.is_starred });
	};

	const sortedBoards = [...boards].sort(
		(a, b) => Number(b.is_starred) - Number(a.is_starred)
	);

	return (
		<div className={`bg-purple-950 min-w-72 w-72`}>
			<div className="flex flex-col text-white">
				<span className="mt-2 font-copy font-bold px-4 py-2">
					Your boards
				</span>
				{sortedBoards.map((board) => (
					<Link
						key={board.id}
						href={`/board/${board.id}`}
						className={`group px-4 py-1.5 flex items-center justify-between h-9 hover:bg-white hover:bg-opacity-20 ${
							board.id === activeBoardId &&
							'bg-white bg-opacity-45'
						}`}
					>
						<div className="flex items-center h-full gap-2">
							<div
								className={`h-full w-8 rounded bg-gradient-to-br ${board.background}`}
							></div>
							<span className="font-copy text-sm font-medium">
								{board.name}
							</span>
						</div>
						{board.is_starred ? (
							<FaStar
								onClick={(e) => toggleStarredStatus(e, board)}
								className="hover:scale-110"
							/>
						) : (
							<FaRegStar
								onClick={(e) => toggleStarredStatus(e, board)}
								className="hover:scale-110 group-hover:opacity-100 opacity-0"
							/>
						)}
					</Link>
				))}
			</div>
		</div>
	);
};

export default BoardSidebar;
