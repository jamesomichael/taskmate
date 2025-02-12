import React, { useEffect, useState } from 'react';

import AddCard from './AddCard';

import { createClient } from '@/utils/supabase/client';
import { createCard, getCards } from '@/services/database.service';

// const handleCardCreation = async (title, listId, boardId) => {
// 	'use server';
// 	const supabase = await createClient();
// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();
// 	const data = await createCard(title, listId, boardId, user.id, supabase);
// 	revalidatePath('/(app)/board/[id]', 'page');
// 	return data;
// };

const List = ({ boardId, list }) => {
	const [cards, setCards] = useState([]);

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
	}, []);

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
			<div className="flex flex-col p-2 gap-2 overflow-y-scroll">
				{cards.map((card) => (
					<div
						key={card.id}
						className="shadow-xl p-2 bg-white h-fit rounded-md outline outline-[1px] outline-gray-300 hover:outline-2 hover:outline-blue-600 hover:cursor-pointer"
					>
						<span>{card.title}</span>
					</div>
				))}
				<div className="mt-1">
					<AddCard
						boardId={boardId}
						listId={list.id}
						onCreate={handleCardCreation}
					/>
				</div>
			</div>
			{/* {isAddingCard ? (
				<div className="h-fit flex flex-col gap-3.5">
					<textarea
						type="text"
						placeholder="Enter a title"
						className="resize-none h-20 outline outline-[1px] outline-gray-300 shadow-xl rounded-lg p-2"
					/>
					<div className="flex gap-4">
						<button className="bg-blue-600 px-3 py-2 text-white font-medium font-copy text-sm rounded">
							Add card
						</button>
						<button onClick={() => setIsAddingCard(false)}>
							Close
						</button>
					</div>
				</div>
			) : (
				<div
					onClick={() => setIsAddingCard(true)}
					className="h-8 rounded hover:bg-gray-300 hover:cursor-pointer flex items-center gap-2 px-3 text-black font-copy text-sm font-medium"
				>
					<FaPlus />
					<span>Add a card</span>
				</div>
			)} */}
		</div>
	);
};

export default List;
