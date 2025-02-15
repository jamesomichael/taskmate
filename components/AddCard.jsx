'use client';
import React, { useState } from 'react';

import { FaPlus } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const AddCard = ({ listId, index }) => {
	const { addCard, board } = useBoardStore();
	const [isAddingCard, setIsAddingCard] = useState(false);
	const [cardTitle, setCardTitle] = useState('');

	const handleCardCreation = async () => {
		await addCard(cardTitle, index, listId, board.id);
		setCardTitle('');
	};

	return isAddingCard ? (
		<div className="h-fit flex flex-col gap-3.5">
			<textarea
				type="text"
				placeholder="Enter a title"
				value={cardTitle}
				onChange={(e) => setCardTitle(e.target.value)}
				className="resize-none h-20 outline outline-[1px] outline-gray-300 shadow-xl rounded-lg p-2"
			/>
			<div className="flex gap-4">
				<button
					onClick={handleCardCreation}
					className="bg-blue-600 px-3 py-2 text-white font-medium font-copy text-sm rounded"
				>
					Add card
				</button>
				<button onClick={() => setIsAddingCard(false)}>Close</button>
			</div>
		</div>
	) : (
		<div
			onClick={() => setIsAddingCard(true)}
			className="h-8 rounded-md hover:bg-gray-300 hover:cursor-pointer flex items-center gap-2 px-3 text-black font-copy text-sm font-medium"
		>
			<FaPlus />
			<span>Add a card</span>
		</div>
	);
};

export default AddCard;
