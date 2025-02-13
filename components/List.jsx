import React, { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import AddCard from './AddCard';

import { createClient } from '@/utils/supabase/client';
import { createCard, getCards } from '@/services/database.service';
import Card from './Card';
import SortableCard from './SortableCard';

const List = ({ boardId, list }) => {
	const [cards, setCards] = useState([]);

	const { setNodeRef } = useDroppable({
		...list,
	});

	useEffect(() => {
		const fetchCards = async () => {
			const supabase = await createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			const data = await getCards(list.id, user.id, supabase);
			setCards(data);
		};
		fetchCards();
	}, [list.id]);

	const handleCardCreation = async (title, listId, boardId) => {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const data = await createCard(
			title,
			listId,
			boardId,
			user.id,
			supabase
		);
		setCards((prev) => [...prev, data]);
	};

	return (
		<div
			key={list.id}
			className="drop-shadow-md min-w-full sm:min-w-72 grid grid-rows-[auto,1fr,auto] h-fit max-h-full bg-white rounded-xl"
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
						<AddCard
							boardId={boardId}
							listId={list.id}
							onCreate={handleCardCreation}
						/>
					</div>
				</div>
			</SortableContext>
		</div>
	);
};

export default List;
