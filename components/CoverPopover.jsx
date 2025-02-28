import React from 'react';

import useBoardStore from '@/stores/boardStore';

const covers = [
	'bg-yellow-400',
	'bg-teal-400',
	'bg-orange-300',
	'bg-rose-400',
	'bg-violet-400',
	'bg-blue-400',
	'bg-blue-300',
	'bg-lime-500',
	'bg-pink-400',
	'bg-gray-500',
];

const CoverPopover = () => {
	const { activeCard, updateCard } = useBoardStore();

	const handleCoverSelection = async (selectedCover) => {
		let cover = null;
		if (selectedCover !== activeCard.cover) {
			cover = selectedCover;
		}
		await updateCard(
			activeCard.id,
			{ cover },
			activeCard.board_id,
			activeCard.list_id,
			true
		);
	};

	const removeCover = async () => {
		await updateCard(
			activeCard.id,
			{ cover: null },
			activeCard.board_id,
			activeCard.list_id,
			true
		);
	};

	return (
		<div className="flex flex-col gap-2 items-center w-72">
			<span className="font-bold font-copy">Cover</span>
			<div className="flex flex-col gap-2">
				<span className="font-copy text-xs font-bold">Colours</span>
				<div className="grid grid-cols-5 gap-2">
					{covers.map((cover, i) => (
						<div
							key={i}
							onClick={() => handleCoverSelection(cover)}
							className={`hover:cursor-pointer hover:bg-opacity-75 min-w-12 h-8 ${cover} cursor-pointer rounded ${
								cover === activeCard.cover
									? 'outline outline-2 outline-blue-600 outline-offset-2'
									: ''
							}`}
						></div>
					))}
				</div>
				{activeCard.cover && (
					<button
						onClick={removeCover}
						className="mt-1 h-9 hover:bg-gray-300 w-full rounded flex justify-center items-center font-copy font-medium text-sm"
					>
						Remove cover
					</button>
				)}
			</div>
		</div>
	);
};

export default CoverPopover;
