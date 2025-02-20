'use client';
import React, { useEffect } from 'react';

import Lists from './Lists';
import Loader from './Loader';

import useBoardStore from '@/stores/boardStore';
import { FaRegStar, FaStar } from 'react-icons/fa6';

const Board = ({ id }) => {
	const { isLoadingBoard, board, getBoard, updateBoard } = useBoardStore();

	useEffect(() => {
		getBoard(id);
	}, [getBoard, id]);

	const toggleStarredStatus = async (e) => {
		e.preventDefault();
		updateBoard(board.id, { is_starred: !board.is_starred });
	};

	return isLoadingBoard ? (
		<Loader />
	) : board ? (
		<div
			className={`grid grid-rows-[auto,1fr] h-full overflow-hidden w-full`}
		>
			<div className="h-14 bg-black bg-opacity-45 flex gap-4 items-center px-4 py-3">
				<span className="font-copy font-semibold text-white text-lg">
					{board.name}
				</span>
				<div
					onClick={toggleStarredStatus}
					className="h-full aspect-square rounded flex justify-center items-center text-yellow-400 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer text-sm"
				>
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
		<div className="flex justify-center items-center h-full w-full">
			<span className="font-heading">Board not found.</span>
		</div>
	);
};

export default Board;
