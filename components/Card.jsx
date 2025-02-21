import React from 'react';

import useBoardStore from '@/stores/boardStore';

const Card = ({ card, isBeingDragged }) => {
	const { setActiveCard } = useBoardStore();

	return (
		<div
			onClick={() => setActiveCard(card)}
			className={`shadow-xl p-2 bg-white h-fit rounded-md outline outline-[1px] outline-gray-300 hover:outline-2 hover:outline-blue-600 hover:cursor-pointer ${
				isBeingDragged ? 'rotate-3 shadow-lg' : ''
			}`}
		>
			<span>{card.title}</span>
		</div>
	);
};

export default Card;
