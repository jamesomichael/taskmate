import { create } from 'zustand';
import { produce } from 'immer';
import axios from 'axios';

import { createClient } from '@/utils/supabase/client';
import {
	getBoardById,
	getBoards,
	getCards,
	getLists,
	createList,
	createCard,
	updateCard,
	deleteCard,
	updateCards,
	createBoard,
	updateBoard,
	deleteBoard,
} from '@/services/database.service';

const useBoardStore = create((set, get) => ({
	isLoadingBoards: true,
	isLoadingBoard: true,
	boards: [],
	board: null,
	lists: [],
	dirtyCards: {},
	dirtyLists: [],
	activeCard: null,

	setActiveCard: (card) => {
		set({ activeCard: card });
	},
	getBoards: async () => {
		set({ isLoadingBoards: true });
		const response = await axios.get('/api/boards');
		const boards = response.data;
		set({ boards, isLoadingBoards: false });
	},
	createBoard: async (name, background) => {
		const response = await axios.post('/api/boards', {
			name,
			background,
		});
		const board = response.data;
		set(
			produce((draft) => {
				draft.boards = [board, ...draft.boards];
			})
		);
	},
	updateBoard: async (id, updates) => {
		const supabase = createClient();
		await updateBoard(id, updates, supabase);

		// TODO: HANDLE POSSIBLE ERRORS INSIDE DATABASE SERVICE.
		// ** SHOULD NOT UPDATE STATE IF ERROR OCCURS.

		set(
			produce((draft) => {
				const boardIndex = draft.boards.findIndex(
					(board) => board.id === id
				);
				const board = draft.boards[boardIndex];
				draft.boards[boardIndex] = {
					...board,
					...updates,
				};

				if (draft.board?.id === id) {
					draft.board = {
						...draft.board,
						...updates,
					};
				}
			})
		);
	},
	deleteBoard: async (id) => {
		const supabase = createClient();
		await deleteBoard(id, supabase);
		set(
			produce((draft) => {
				draft.boards = draft.boards.filter((board) => board.id !== id);
			})
		);
	},
	getBoard: async (id) => {
		set({ isLoadingBoard: true, board: null, lists: [] });
		const supabase = await createClient();
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		const board = await getBoardById(id, user.id, supabase);

		if (!board) {
			set({ isLoadingBoard: false });
			return;
		}

		const lists = await getLists(id, user.id, supabase);
		const cards = await getCards(id, user.id, supabase);
		set({
			isLoadingBoard: false,
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
	updateCard: async (id, updates, listId, isActiveCard = false) => {
		try {
			const supabase = createClient();
			await updateCard(id, updates, supabase);

			set(
				produce((draft) => {
					const list = draft.lists.find((list) => list.id === listId);

					if (!list) {
						return;
					}

					const cardIndex = list.cards.findIndex(
						(card) => card.id === id
					);

					if (cardIndex === -1) {
						return;
					}

					const card = list.cards[cardIndex];
					list.cards[cardIndex] = {
						...card,
						...updates,
					};

					if (isActiveCard && draft.activeCard?.id === id) {
						draft.activeCard = {
							...draft.activeCard,
							...updates,
						};
					}
				})
			);
		} catch (error) {
			console.error('Error updating card:', error.message);
		}
	},

	deleteCard: async (id, listId) => {
		const supabase = createClient();
		await deleteCard(id, supabase);
		set(
			produce((draft) => {
				const list = draft.lists.find((list) => list.id === listId);
				list.cards = list.cards.filter((card) => card.id !== id);
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
