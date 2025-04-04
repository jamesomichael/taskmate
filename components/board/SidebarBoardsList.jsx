import React from 'react';
import Link from 'next/link';

import { FaRegStar, FaStar } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const SidebarBoardsList = ({ activeBoardId, boards }) => {
	const { updateBoard } = useBoardStore();

	const toggleStarredStatus = async (e, board) => {
		e.preventDefault();
		updateBoard(board.id, { is_starred: !board.is_starred });
	};

	return boards.map((board) => (
		<Link
			key={board.id}
			href={`/board/${board.id}`}
			className={`group px-4 py-1.5 grid grid-cols-[1fr,auto] items-center h-9 hover:bg-white hover:bg-opacity-20 ${
				board.id === activeBoardId && 'bg-white bg-opacity-45'
			}`}
		>
			<div className="flex items-center h-full gap-2 w-full truncate">
				<div
					className={`h-full min-w-8 w-8 rounded bg-gradient-to-br ${board.background}`}
				></div>
				<span
					title={board.name}
					className="font-copy text-sm font-medium truncate"
				>
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
	));
};

export default SidebarBoardsList;
