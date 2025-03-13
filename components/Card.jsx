import React, { useState } from 'react';

import ContextMenu from './ContextMenu';
import ConfirmModal from './ConfirmModal';

import { FaRegCircle, FaCircleCheck } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const Card = ({ card, isBeingDragged }) => {
	const { setActiveCard, updateCard, deleteCard, draggedCard } =
		useBoardStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleCompletionStatus = async (e) => {
		e.stopPropagation();
		await updateCard(
			card.id,
			{ is_complete: !card.is_complete },
			card.board_id,
			card.list_id
		);
	};

	const handleCardDeletion = async () => {
		await deleteCard(card.id, card.board_id, card.list_id);
	};

	return (
		<>
			<ContextMenu
				trigger={
					<div
						onClick={() => setActiveCard(card)}
						className={`group shadow-xl ${
							draggedCard?.id === card.id && !isBeingDragged
								? 'bg-black opacity-25'
								: 'bg-white'
						} h-fit rounded-md outline outline-[1px] outline-gray-300 hover:outline-2 hover:outline-blue-600 hover:cursor-pointer ${
							isBeingDragged ? 'rotate-3 shadow-lg' : ''
						}`}
					>
						{card.cover && (
							<div
								className={`${card.cover} h-8 w-full rounded-t`}
							></div>
						)}
						<div className="grid grid-rows-[auto,auto] grid-cols-[auto,1fr] min-h-10 gap-x-1.5 p-2">
							<div className="py-1 flex justify-center items-center">
								{card.is_complete ? (
									<FaCircleCheck
										size={15}
										onClick={toggleCompletionStatus}
										title="Mark incomplete"
										className="text-green-600"
									/>
								) : (
									<FaRegCircle
										size={15}
										onClick={toggleCompletionStatus}
										title="Mark complete"
										className="hidden group-hover:flex"
									/>
								)}
							</div>
							<span className="font-copy row-span-2 text-sm self-center line-clamp-4">
								{card.title}
							</span>
						</div>
					</div>
				}
				actions={[
					{
						label: 'Delete Card',
						onClick: () => setIsModalOpen(true),
					},
				]}
			/>
			<ConfirmModal
				isOpen={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleCardDeletion}
				confirmationButtonText="Delete Card"
			>
				<span className="font-copy">
					This card will be permanently deleted. This action cannot be
					undone.
				</span>
			</ConfirmModal>
		</>
	);
};

export default Card;
