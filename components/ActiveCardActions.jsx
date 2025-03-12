import React from 'react';

import Popover from '@/components/Popover';
import CoverPopover from './CoverPopover';

import { FaRegTrashCan, FaRegWindowMaximize } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';
import ActiveCardAction from './ActiveCardAction';

const ActiveCardActions = () => {
	const { activeCard, setActiveCard, deleteCard } = useBoardStore();

	const handleCardDeletion = async () => {
		await deleteCard(
			activeCard.id,
			activeCard.board_id,
			activeCard.list_id
		);
		setActiveCard(null);
	};

	return (
		<div className="flex flex-col gap-2">
			<span className="text-xs font-copy font-semibold">Actions</span>
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
				onClick={handleCardDeletion}
				icon={FaRegTrashCan}
				label="Delete"
				className="hover:bg-red-700 bg-red-600 text-white"
			/>
		</div>
	);
};

export default ActiveCardActions;
