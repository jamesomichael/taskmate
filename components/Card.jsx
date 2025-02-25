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
			className={`group shadow-xl bg-white h-fit rounded-md outline outline-[1px] outline-gray-300 hover:outline-2 hover:outline-blue-600 hover:cursor-pointer ${
				isBeingDragged ? 'rotate-3 shadow-lg' : ''
			}`}
		>
			{card.cover && (
				<div className={`${card.cover} h-8 w-full rounded-t`}></div>
			)}
			<div className="grid grid-cols-[auto,1fr] gap-0.5 p-2">
				{card.is_complete ? (
					<div className="p-1">
						<FaCircleCheck
							onClick={toggleCompletionStatus}
							title="Mark incomplete"
							className="text-green-600"
						/>
					</div>
				) : (
					<div className="p-1">
						<FaRegCircle
							onClick={toggleCompletionStatus}
							title="Mark complete"
							className="hidden group-hover:flex"
						/>
					</div>
				)}
				<span>{card.title}</span>
			</div>
		</div>
	);
};

export default Card;
