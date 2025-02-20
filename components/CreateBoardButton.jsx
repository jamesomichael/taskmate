'use client';
import React, { useState } from 'react';
import CreateBoard from './CreateBoard';
import useBoardStore from '@/stores/boardStore';

const BOARDS_ALLOWED = process.env.NEXT_PUBLIC_BOARDS_ALLOWED || 10;

const CreateBoardButton = ({ className, children }) => {
	const { createBoard, boards } = useBoardStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const boardsCount = boards.length || 0;
	const boardsAllowed = BOARDS_ALLOWED - boardsCount;

	const handleBoardCreation = async (name, background) => {
		await createBoard(name, background);
	};

	if (boardsAllowed <= 0) {
		return null;
	}

	return (
		<>
			<button onClick={() => setIsModalOpen(true)} className={className}>
				{children}
			</button>
			{isModalOpen && (
				<CreateBoard
					onCreate={handleBoardCreation}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</>
	);
};

export default CreateBoardButton;
