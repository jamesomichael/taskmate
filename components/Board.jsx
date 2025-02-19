'use client';
import React, { useEffect } from 'react';

import Lists from './Lists';
import Loader from './Loader';

import useBoardStore from '@/stores/boardStore';
import { FaRegStar, FaStar } from 'react-icons/fa6';

const Board = ({ id }) => {
	const { isLoading, board, getBoard } = useBoardStore();

	useEffect(() => {
		getBoard(id);
	}, [getBoard, id]);

	return isLoading ? (
		<Loader />
	) : board ? (
		<div
			className={`grid grid-rows-[auto,1fr] bg-gradient-to-br ${board.background} h-full overflow-hidden w-full`}
		>
			<div className="h-14 bg-black bg-opacity-45 flex gap-4 items-center px-4 py-3">
				<span className="font-copy font-semibold text-white text-lg">
					{board.name}
				</span>
				<div className="h-full aspect-square rounded flex justify-center items-center text-yellow-400 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer text-sm">
					{board.is_starred ? (
						<FaStar />
					) : (
						<FaRegStar className="text-white" />
					)}
				</div>
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
