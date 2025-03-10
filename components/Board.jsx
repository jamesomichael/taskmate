'use client';
import React, { useEffect } from 'react';

import Lists from './Lists';
import Loader from './Loader';

import useBoardStore from '@/stores/boardStore';
import BoardHeader from './BoardHeader';

const Board = ({ id }) => {
	const { isLoadingBoard, board, getBoard } = useBoardStore();

	useEffect(() => {
		getBoard(id);
	}, [getBoard, id]);

	return isLoadingBoard ? (
		<Loader />
	) : board ? (
		<div
			className={`grid grid-rows-[auto,1fr] h-full overflow-hidden w-full`}
		>
			<BoardHeader
				id={board.id}
				isStarred={board.is_starred}
				name={board.name}
			/>
			<Lists />
		</div>
	) : (
		<div className="flex justify-center items-center h-full w-full">
			<span className="font-heading">Board not found.</span>
		</div>
	);
};

export default Board;
