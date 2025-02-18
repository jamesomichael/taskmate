'use client';
import React, { useState } from 'react';

import { createClient } from '@/utils/supabase/client';
import { createBoard, deleteBoard } from '@/services/database.service';

import CreateBoard from './CreateBoard';
import ContextMenu from './ContextMenu';
import BoardsGridItem from './BoardsGridItem';

const BOARDS_ALLOWED = process.env.NEXT_PUBLIC_BOARDS_ALLOWED || 10;

const BoardsGrid = ({ boards: initialBoards, userId, allowCreate = true }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [boards, setBoards] = useState(initialBoards);
	const [selectedBoardId, setSelectedBoardId] = useState(null);
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({
		x: 0,
		y: 0,
	});

	const boardsCount = boards.length || 0;
	const boardsAllowed = BOARDS_ALLOWED - boardsCount;

	const handleBoardCreation = async (name, background) => {
		const supabase = createClient();
		const data = await createBoard(name, background, userId, supabase);
		setBoards((prev) => [data, ...prev]);
	};

	const handleBoardDeletion = async (boardId) => {
		const supabase = createClient();
		await deleteBoard(boardId, supabase);
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
			onClick: () => handleBoardDeletion(selectedBoardId),
		},
		{
			label: 'Cancel',
			onClick: () => setIsContextMenuOpen(false),
		},
	];

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-4 sm:gap-4">
			{boards.map((board) => {
				return <BoardsGridItem key={board.id} board={board} />;
			})}

			{boardsAllowed > 0 && allowCreate && (
				<div
					onClick={() => setIsModalOpen(true)}
					className="h-24 rounded outline-gray-800 flex flex-col gap-1 font-medium justify-center items-center p-2 hover:bg-neutral-200 hover:cursor-pointer"
				>
					<span className="text-gray-800 text-sm">
						Create new board
					</span>
					<span className="text-xs">{boardsAllowed} remaining</span>
				</div>
			)}

			{isModalOpen && (
				<CreateBoard
					onCreate={handleBoardCreation}
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
