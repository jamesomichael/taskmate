import React from 'react';

import HeaderInput from './HeaderInput';

import { FaRegStar, FaStar } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const BoardHeader = ({ id, isStarred, name }) => {
	const { updateBoard } = useBoardStore();

	const toggleStarredStatus = async (e) => {
		e.preventDefault();
		updateBoard(id, { is_starred: !isStarred });
	};

	const saveName = async (updatedName) => {
		await updateBoard(id, { name: updatedName });
	};

	return (
		<div className="h-14 bg-black bg-opacity-45 flex gap-4 items-center px-4 py-3">
			<HeaderInput
				value={name}
				onSave={saveName}
				className="truncate px-2 h-full font-copy font-semibold text-white text-lg bg-transparent hover:cursor-pointer hover:bg-white hover:bg-opacity-25 focus:text-black focus:bg-white rounded"
			/>
			<div
				onClick={toggleStarredStatus}
				className="h-full aspect-square rounded flex justify-center items-center text-yellow-400 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer text-sm"
			>
				{isStarred ? <FaStar /> : <FaRegStar className="text-white" />}
			</div>
		</div>
	);
};

export default BoardHeader;
