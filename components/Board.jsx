'use client';
import React, { useEffect } from 'react';

import Lists from './Lists';

import useBoardStore from '@/stores/boardStore';

const Board = ({ id }) => {
	const { isLoading, board, getBoard } = useBoardStore();

	useEffect(() => {
		getBoard(id);
	}, [getBoard, id]);

	return isLoading ? (
		<div>Loading...</div>
	) : board ? (
		<div
			className={`grid grid-rows-[auto,1fr] bg-gradient-to-br ${board.background} h-full overflow-hidden w-full`}
		>
			<div className="h-14 bg-black bg-opacity-45 flex items-center px-4">
				<span className="font-copy font-semibold text-white text-lg">
					{board.name}
				</span>
			</div>
			<Lists />
		</div>
	) : (
		<div className="flex justify-center items-center h-full">
			<span className="font-heading">Board not found.</span>
		</div>
	);
};

export default Board;
