'use client';
import React, { useState } from 'react';

import { FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import useBoardStore from '@/stores/boardStore';

const AddList = () => {
	const { addList, lists, board } = useBoardStore();
	const [isAddingList, setIsAddingList] = useState(false);
	const [listName, setListName] = useState('');

	const handleListCreation = async () => {
		await addList(listName, board.id);
		setIsAddingList(false);
	};

	return (
		<div className="min-w-full sm:min-w-72 drop-shadow-md">
			{isAddingList ? (
				<div className="h-fit flex flex-col gap-2 bg-white p-2 rounded-xl">
					<input
						autoFocus
						type="text"
						placeholder="Enter list name..."
						onChange={(e) => setListName(e.target.value)}
						className="h-8 outline outline-[1px] outline-gray-400 focus:outline-2 focus:outline-blue-600 shadow-xl rounded p-2"
					/>
					<div className="flex gap-2">
						<button
							onClick={handleListCreation}
							className="bg-blue-600 hover:bg-blue-700 px-3 h-9 text-white font-medium font-copy text-sm rounded"
						>
							Add list
						</button>
						<button
							className="flex justify-center items-center hover:bg-gray-300 h-9 rounded aspect-square"
							onClick={() => setIsAddingList(false)}
						>
							<IoClose size={22} />
						</button>
					</div>
				</div>
			) : (
				<div
					onClick={() => setIsAddingList(true)}
					className="h-12 rounded-xl bg-black bg-opacity-30 hover:bg-opacity-20 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium"
				>
					<FaPlus />
					<span>
						{lists.length > 0 ? 'Add another list' : 'Add a list'}
					</span>
				</div>
			)}
		</div>
	);
};

export default AddList;
