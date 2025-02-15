import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import AddCard from './AddCard';
import SortableCard from './SortableCard';

const List = ({ list }) => {
	const { cards } = list;

	const { setNodeRef } = useDroppable({
		...list,
	});

	return (
		<div
			key={list.id}
			className="list drop-shadow-md min-w-full sm:min-w-72 sm:max-w-72 grid grid-rows-[auto,1fr,auto] h-fit max-h-full bg-white rounded-xl"
		>
			<div className="flex px-2 pt-2 items-center h-10">
				<input
					placeholder={list.name}
					className="placeholder-black px-2 h-full w-full font-copy text-sm font-semibold hover:cursor-pointer"
				/>
			</div>
			<SortableContext
				id={list.id}
				items={cards}
				strategy={verticalListSortingStrategy}
			>
				<div
					ref={setNodeRef}
					className="flex flex-col p-2 gap-2 overflow-y-scroll"
				>
					{cards.map((card) => (
						<SortableCard key={card.id} card={card} />
					))}
					<div className="mt-1">
						<AddCard listId={list.id} index={cards.length} />
					</div>
				</div>
			</SortableContext>
		</div>
	);
};

export default List;
