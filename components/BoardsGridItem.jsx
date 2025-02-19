import React, { useState } from 'react';
import Link from 'next/link';

import ContextMenu from './ContextMenu';

import { FaStar, FaRegStar } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const BoardsGridItem = ({ board }) => {
	const { updateBoard, deleteBoard } = useBoardStore();
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({
		x: 0,
		y: 0,
	});

	const contextMenuActions = [
		{
			label: 'Delete Board',
			onClick: () => handleBoardDeletion(board.id),
		},
		{
			label: 'Cancel',
			onClick: () => setIsContextMenuOpen(false),
		},
	];

	const toggleStarredStatus = async (e) => {
		e.preventDefault();
		updateBoard(board.id, { is_starred: !board.is_starred });
	};

	const handleRightClick = (e) => {
		e.preventDefault();
		setContextMenuPosition({ x: e.clientX, y: e.clientY });
		setIsContextMenuOpen(true);
	};

	const handleBoardDeletion = async (boardId) => {
		await deleteBoard(boardId);
		setIsContextMenuOpen(false);
	};

	return (
		<>
			<Link
				href={`/board/${board.id}`}
				onContextMenu={handleRightClick}
				className={`relative h-24 rounded bg-gradient-to-br ${board.background} flex flex-col justify-between p-2 group`}
			>
				<div className="absolute rounded inset-0 bg-black w-full bg-opacity-10 group-hover:bg-opacity-50"></div>
				<span className="relative text-white font-bold drop-shadow-md">
					{board.name}
				</span>
				<button
					onClick={toggleStarredStatus}
					className="flex justify-end z-10 text-white"
				>
					{board.is_starred ? (
						<FaStar
							size={14}
							className="text-yellow-400 transition-opacity duration-200 hover:scale-125"
						/>
					) : (
						<FaRegStar
							size={14}
							className="hover:scale-125 hover:text-yellow-400 group-hover:opacity-100 opacity-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-200"
						/>
					)}
				</button>
			</Link>

			{isContextMenuOpen && (
				<ContextMenu
					position={contextMenuPosition}
					actions={contextMenuActions}
					onClose={() => setIsContextMenuOpen(false)}
				/>
			)}
		</>
	);
};

export default BoardsGridItem;
