import React from 'react';

import Modal from '@/components/Modal';

import useBoardStore from '@/stores/boardStore';

const ActiveCard = () => {
	const { board, lists, activeCard, setActiveCard } = useBoardStore();

	console.error('lists', lists);
	console.error('activeCard', activeCard);

	const list = activeCard
		? lists.find((list) => list.id === activeCard.list_id)
		: null;

	return activeCard ? (
		<Modal
			isOpen={true}
			onClose={() => setActiveCard(null)}
			width="max-w-3xl"
		>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-0.5">
					<span className="font-copy font-bold text-lg">
						{activeCard.title}
					</span>
					<span className="font-copy text-sm flex items-center gap-0.5">
						in list&nbsp;
						<span className="bg-gray-300 text-gray-700 font-bold px-2 text-xs">
							{list.name}
						</span>
					</span>
				</div>
				<div className="flex flex-col">
					<span className="font-copy font-medium">Description</span>
					<textarea
						placeholder="lalal"
						name=""
						id=""
						className="resize-none h-60 hover:bg-gray-300 rounded cursor-pointer p-2"
					/>
				</div>
			</div>
		</Modal>
	) : null;
};

export default ActiveCard;
