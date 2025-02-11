'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { createClient } from '@/utils/supabase/client';

import CreateBoard from './CreateBoard';
import ContextMenu from './ContextMenu';

const BoardsGrid = ({ boards: initialBoards, userId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [boards, setBoards] = useState(initialBoards);
	const [selectedBoardId, setSelectedBoardId] = useState(null);
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({
		x: 0,
		y: 0,
	});

	const boardsCount = boards.length || 0;
	const boardsAllowed = 5 - boardsCount;

	const createBoard = async (name) => {
		const supabase = createClient();
		const { data, error } = await supabase
			.from('boards')
			.insert([{ user_id: userId, name }])
			.select()
			.single();

		if (error) {
			console.error('Error creating board:', error);
			return;
		}

		setBoards((prev) => [data, ...prev]);
	};

	const deleteBoard = async (boardId) => {
		const supabase = createClient();
		const { error } = await supabase
			.from('boards')
			.delete()
			.eq('id', boardId);

		if (error) {
			console.error('Error deleting board:', error);
			return;
		}

		setBoards((prev) => prev.filter((board) => board.id !== boardId));
		setIsContextMenuOpen(false);
	};

	const handleRightClick = (e, boardId) => {
		e.preventDefault();
		setContextMenuPosition({ x: e.clientX, y: e.clientY });
		setSelectedBoardId(boardId);
		setIsContextMenuOpen(true);
	};

	const contextMenuActions = [
		{
			label: 'Delete Board',
			onClick: () => deleteBoard(selectedBoardId),
		},
		{
			label: 'Cancel',
			onClick: () => setIsContextMenuOpen(false),
		},
	];

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
			{boards.map((board) => {
				return (
					<Link
						href={`/board/${board.id}`}
						key={board.id}
						onContextMenu={(e) => handleRightClick(e, board.id)}
						className="w-40 sm:w-44 aspect-video rounded bg-gradient-to-br from-indigo-700 to-pink-700 flex p-2 hover:from-indigo-800 hover:to-pink-800"
					>
						<span className="text-white font-bold">
							{board.name}
						</span>
					</Link>
				);
			})}

			{boardsAllowed > 0 && (
				<div
					onClick={() => setIsModalOpen(true)}
					className="w-44 aspect-video rounded outline-gray-800 flex flex-col gap-1 font-medium justify-center items-center p-2 hover:bg-neutral-200 hover:cursor-pointer"
				>
					<span className="text-gray-800 text-sm">
						Create new board
					</span>
					<span className="text-xs">{boardsAllowed} remaining</span>
				</div>
			)}

			{isModalOpen && (
				<CreateBoard
					onCreate={createBoard}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			)}

			{isContextMenuOpen && (
				<ContextMenu
					position={contextMenuPosition}
					actions={contextMenuActions}
					onClose={() => setIsContextMenuOpen(false)}
				/>
			)}
		</div>
	);
};

export default BoardsGrid;
