'use client';
import React, { useState, useRef } from 'react';

import { FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import useBoardStore from '@/stores/boardStore';

const AddCard = ({ listId, index }) => {
	const { addCard, board } = useBoardStore();
	const [isAddingCard, setIsAddingCard] = useState(false);
	const [cardTitle, setCardTitle] = useState('');
	const inputRef = useRef(null);

	const handleCardCreation = async () => {
		await addCard(cardTitle, index, listId, board.id);
		setCardTitle('');
		inputRef?.current?.focus();
	};

	const handleCancel = () => {
		setIsAddingCard(false);
		setCardTitle('');
	};

	return isAddingCard ? (
		<div className="h-fit flex flex-col gap-3.5">
			<textarea
				ref={inputRef}
				autoFocus
				type="text"
				placeholder="Enter a title"
				value={cardTitle}
				onChange={(e) => setCardTitle(e.target.value)}
				className="resize-none h-20 outline outline-[1px] outline-gray-300 focus:outline-2 focus:outline-blue-600 shadow-xl rounded-lg p-2"
			/>
			<div className="flex gap-2">
				<button
					onClick={handleCardCreation}
					className="bg-blue-600 hover:bg-blue-700 px-3 h-9 text-white font-medium font-copy text-sm rounded"
				>
					Add card
				</button>
				<button
					className="flex justify-center items-center hover:bg-gray-300 h-9 rounded aspect-square"
					onClick={handleCancel}
				>
					<IoClose size={22} />
				</button>
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
