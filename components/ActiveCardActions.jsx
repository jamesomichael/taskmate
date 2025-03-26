import React, { useState } from 'react';

import Popover from '@/components/Popover';
import CoverPopover from './CoverPopover';
import ConfirmModal from './ConfirmModal';
import ActiveCardAction from './ActiveCardAction';

import { FaRegTrashCan, FaRegWindowMaximize } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const ActiveCardActions = () => {
	const { activeCard, setActiveCard, deleteCard } = useBoardStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCardDeletion = async () => {
		await deleteCard(
			activeCard.id,
			activeCard.board_id,
			activeCard.list_id
		);
		setActiveCard(null);
	};

	return (
		<>
			<div className="flex md:w-full md:flex-col gap-2">
				<span className="hidden md:block text-xs font-copy font-semibold">
					Actions
				</span>
				<div className="relative">
					<Popover
						trigger={
							<ActiveCardAction
								icon={FaRegWindowMaximize}
								label="Cover"
							/>
						}
					>
						<CoverPopover />
					</Popover>
				</div>
				<ActiveCardAction
					onClick={() => setIsModalOpen(true)}
					icon={FaRegTrashCan}
					label="Delete"
					className="hover:bg-red-700 bg-red-600 text-white"
				/>
			</div>

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

export default ActiveCardActions;
