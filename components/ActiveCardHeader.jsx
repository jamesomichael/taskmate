import React, { useState } from 'react';

import HeaderInput from './HeaderInput';

import { FaRegCircle, FaCircleCheck } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const ActiveCardHeader = () => {
	const { lists, activeCard, updateCard } = useBoardStore();
	const [isComplete, setIsComplete] = useState(
		activeCard?.is_complete || false
	);

	const saveTitle = async (updatedTitle) => {
		await updateCard(
			activeCard.id,
			{ title: updatedTitle },
			activeCard.board_id,
			activeCard.list_id,
			true
		);
	};

	const toggleCompletionStatus = async () => {
		await updateCard(
			activeCard.id,
			{ is_complete: !isComplete },
			activeCard.board_id,
			activeCard.list_id,
			true
		);
		setIsComplete((prev) => !prev);
	};

	const list = activeCard
		? lists.find((list) => list.id === activeCard.list_id)
		: null;

	return (
		<div className="grid grid-rows-[auto,auto] grid-cols-[1rem,1fr] items-center gap-x-5 gap-y-1">
			{isComplete ? (
				<FaCircleCheck
					onClick={toggleCompletionStatus}
					title="Mark incomplete"
					className="text-green-600 cursor-pointer"
				/>
			) : (
				<FaRegCircle
					onClick={toggleCompletionStatus}
					title="Mark complete"
					className="cursor-pointer"
				/>
			)}
			<HeaderInput
				value={activeCard.title}
				onSave={saveTitle}
				className="truncate -ml-2 w-[95%] px-2 py-1 font-copy font-bold text-lg"
			/>
			<div className="w-full"></div>
			<span className="font-copy text-sm flex items-center gap-0.5">
				in list&nbsp;
				<span className="bg-gray-300 text-gray-700 font-bold px-2 text-xs rounded">
					{list.name}
				</span>
			</span>
		</div>
	);
};

export default ActiveCardHeader;
