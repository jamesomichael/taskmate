'use client';
import React, { useState } from 'react';

import CreateBoard from './CreateBoard';
import BoardsGridItem from './BoardsGridItem';

import useBoardStore from '@/stores/boardStore';

const BOARDS_ALLOWED = process.env.NEXT_PUBLIC_BOARDS_ALLOWED || 10;

const BoardsGrid = ({ boards, allowCreate = true }) => {
	const { createBoard } = useBoardStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const boardsCount = boards.length || 0;
	const boardsAllowed = BOARDS_ALLOWED - boardsCount;

	const handleBoardCreation = async (name, background) => {
		await createBoard(name, background);
	};

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
		</div>
	);
};

export default BoardsGrid;
