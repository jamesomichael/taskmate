'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import CreateBoard from './CreateBoard';

import useBoardStore from '@/stores/boardStore';

const BOARDS_ALLOWED = process.env.NEXT_PUBLIC_BOARDS_ALLOWED || 10;

const CreateBoardButton = ({ className, children }) => {
	const router = useRouter();
	const { createBoard, boards } = useBoardStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const boardsCount = boards.length || 0;
	const boardsAllowed = BOARDS_ALLOWED - boardsCount;

	const handleBoardCreation = async (name, background) => {
		const createdBoard = await createBoard(name, background);
		router.push(`/board/${createdBoard.id}`);
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
