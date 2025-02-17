import { create } from 'zustand';
import { produce } from 'immer';

import { createClient } from '@/utils/supabase/client';
import {
	getBoardById,
	getCards,
	getLists,
	createList,
	createCard,
	updateCards,
} from '@/services/database.service';

const useBoardStore = create((set, get) => ({
	isLoading: true,
	board: null,
	lists: [],
	dirtyCards: {},
	dirtyLists: [],

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
	addCard: async (title, index, listId, boardId) => {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const data = await createCard(
			title,
			index,
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
	moveCard: (card, fromContainer, toContainer, fromIndex, toIndex) => {
		set(
			produce((draft) => {
				const fromList = draft.lists.find(
					(list) => list.id === fromContainer.id
				);
				const toList = draft.lists.find(
					(list) => list.id === toContainer.id
				);

				if (!fromList || !toList || fromIndex < 0) {
					return;
				}

				const [movedCard] = fromList.cards.splice(fromIndex, 1);

				if (toIndex < 0) {
					toIndex = 0;
				} else if (toIndex > toList.cards.length) {
					toIndex = toList.cards.length;
				}

				const updatedCard = {
					...movedCard,
					list_id: toList.id,
					index: toIndex,
				};
				toList.cards.splice(toIndex, 0, updatedCard);
				draft.dirtyCards[card.id] = updatedCard;

				if (!draft.dirtyLists.includes(fromList.id)) {
					draft.dirtyLists.push(fromList.id);
				}
				if (!draft.dirtyLists.includes(toList.id)) {
					draft.dirtyLists.push(toList.id);
				}
			})
		);
	},
	saveCards: async () => {
		set(
			produce((draft) => {
				const { dirtyLists, lists } = draft;
				dirtyLists.forEach((dirtyListId) => {
					const dirtyList = lists.find(
						({ id: listId }) => listId === dirtyListId
					);
					dirtyList.cards.forEach((card, index) => {
						if (card.index !== index) {
							draft.dirtyCards[card.id] = {
								...card,
								index,
							};
							card.index = index;
						}
					});
				});
			})
		);
		const { dirtyCards } = get();
		const dirtyCardsArray = Object.values(dirtyCards);
		const supabase = await createClient();
		await updateCards(dirtyCardsArray, supabase);
		set({ dirtyLists: [], dirtyCards: {} });
	},
}));

export default useBoardStore;
