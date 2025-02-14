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
}));

export default useBoardStore;
