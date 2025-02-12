import React from 'react';
import { revalidatePath } from 'next/cache';

import AddCard from './AddCard';

import { createClient } from '@/utils/supabase/server';
import { createCard, getCards } from '@/services/database.service';

const handleCardCreation = async (title, listId, boardId) => {
	'use server';
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const data = await createCard(title, listId, boardId, user.id, supabase);
	revalidatePath('/(app)/board/[id]', 'page');
	return data;
};

const List = async ({ boardId, list }) => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const cards = await getCards(list.id, user.id, supabase);

	return (
		<div
			key={list.id}
			className="drop-shadow-md p-2 min-w-full sm:min-w-72 grid grid-rows-[auto,1fr,auto] gap-2 h-fit max-h-full bg-white rounded-xl"
		>
			<div className="flex items-center h-8">
				<input
					placeholder={list.name}
					className="placeholder-black px-2 h-full w-full font-copy text-sm font-semibold hover:cursor-pointer"
				/>
				{/* {list.name} */}
			</div>
			<div className="flex flex-col gap-2 mb-1">
				{cards.map((card) => (
					<div
						key={card.id}
						className="shadow-xl p-2 bg-white h-fit rounded-md outline outline-[1px] outline-gray-300 hover:outline-2 hover:outline-blue-600 hover:cursor-pointer"
					>
						<span>{card.title}</span>
					</div>
				))}
			</div>
			<AddCard
				boardId={boardId}
				listId={list.id}
				onCreate={handleCardCreation}
			/>
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
