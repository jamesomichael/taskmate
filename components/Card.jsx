import React from 'react';

const Card = ({ card }) => {
	return (
		<div className="shadow-xl p-2 bg-white h-fit rounded-md outline outline-[1px] outline-gray-300 hover:outline-2 hover:outline-blue-600 hover:cursor-pointer">
			<span>{card.title}</span>
		</div>
	);
};

export default Card;
