import React from 'react';

import { FaRegCircle, FaCircleCheck } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const Card = ({ card, isBeingDragged }) => {
	const { setActiveCard, updateCard } = useBoardStore();

	const toggleCompletionStatus = async (e) => {
		e.stopPropagation();
		await updateCard(
			card.id,
			{ is_complete: !card.is_complete },
			card.list_id
		);
	};

	return (
		<div
			onClick={() => setActiveCard(card)}
			className={`group grid grid-cols-[auto,1fr] gap-1 p-2 shadow-xl bg-white h-fit rounded-md outline outline-[1px] outline-gray-300 hover:outline-2 hover:outline-blue-600 hover:cursor-pointer ${
				isBeingDragged ? 'rotate-3 shadow-lg' : ''
			}`}
		>
			<div className="p-1">
				{card.is_complete ? (
					<FaCircleCheck
						onClick={toggleCompletionStatus}
						title="Mark incomplete"
						className="text-green-600"
					/>
				) : (
					<FaRegCircle
						onClick={toggleCompletionStatus}
						title="Mark complete"
						className="hidden group-hover:flex"
					/>
				)}
			</div>
			<span>{card.title}</span>
		</div>
	);
};

export default Card;
