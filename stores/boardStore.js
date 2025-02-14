import { create } from 'zustand';
import { produce } from 'immer';

import { createClient } from '@/utils/supabase/client';
import {
	getBoardById,
	getCards,
	getLists,
	createList,
	createCard,
} from '@/services/database.service';

const useBoardStore = create((set) => ({
	isLoading: true,
	board: null,
	lists: [],
	isDirty: false,

	getBoard: async (id) => {
		set({ isLoading: true, board: null, lists: [] });
		const supabase = await createClient();
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		const board = await getBoardById(id, user.id, supabase);

		if (!board) {
			set({ isLoading: false });
			return;
		}

		const lists = await getLists(id, user.id, supabase);
		const cards = await getCards(id, user.id, supabase);
		set({
			isLoading: false,
			board,
			lists: lists.map((list) => ({
				...list,
				cards: cards.filter((card) => card.list_id === list.id),
			})),
		});
	},
	addList: async (name, boardId) => {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const data = await createList(name, boardId, null, user.id, supabase);
		set(
			produce((draft) => {
				draft.lists.push({ ...data, cards: [] });
			})
		);
	},
	addCard: async (title, listId, boardId) => {
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
		set(
			produce((draft) => {
				const list = draft.lists.find(({ id }) => id === listId);
				list.cards.push(data);
			})
		);
	},
	moveCard: (card, fromContainer, toContainer, toIndex) => {
		set({ isDirty: true });
		set(
			produce((draft) => {
				const fromList = draft.lists.find(
					(list) => list.id === fromContainer.id
				);
				const toList = draft.lists.find(
					(list) => list.id === toContainer.id
				);

				const fromIndex = fromList.cards.findIndex(
					(c) => c.id === card.id
				);

				if (fromIndex !== -1) {
					const [removedCard] = fromList.cards.splice(fromIndex, 1);

					if (toIndex < 0) {
						toIndex = 0;
					} else if (toIndex > toList.cards.length) {
						toIndex = toList.cards.length;
					}
					toList.cards.splice(toIndex, 0, removedCard);
				}
			})
		);
	},
}));

export default useBoardStore;
