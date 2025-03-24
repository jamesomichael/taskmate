import { create } from 'zustand';
import { produce } from 'immer';
import axios from 'axios';

const useBoardStore = create((set, get) => ({
	isLoadingBoards: true,
	isLoadingBoard: true,
	isLoadingComments: true,
	boards: [],
	board: null,
	lists: [],
	dirtyCards: {},
	dirtyLists: [],
	activeCard: null,
	draggedCard: null,

	setActiveCard: async (card) => {
		set({ activeCard: card });

		if (card) {
			set({ isLoadingComments: true });
			const { board } = get();
			try {
				const response = await axios.get(
					`/api/boards/${board.id}/cards/${card.id}/comments`
				);
				const comments = response.data;
				set({
					isLoadingComments: false,
					activeCard: { ...card, comments },
				});
			} catch (error) {
				console.error('Error fetching comments.');
				set({ isLoadingComments: false });
			}
		}
	},
	setDraggedCard: (card) => {
		set({ draggedCard: card });
	},
	getBoards: async () => {
		set({ isLoadingBoards: true });
		try {
			const response = await axios.get('/api/boards');
			const boards = response.data;
			set({ boards, isLoadingBoards: false });
		} catch (error) {
			console.error('Error fetching boards.');
			set({ isLoadingBoards: false });
		}
	},
	createBoard: async (name, background) => {
		try {
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
			return board;
		} catch (error) {
			console.error('Error creating board.');
		}
	},
	updateBoard: async (id, updates) => {
		try {
			await axios.patch(`/api/boards/${id}`, updates);
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
		} catch (error) {
			console.error('Error updating board.');
			return false;
		}
	},
	deleteBoard: async (id) => {
		try {
			await axios.delete(`/api/boards/${id}`);
			set(
				produce((draft) => {
					draft.boards = draft.boards.filter(
						(board) => board.id !== id
					);
				})
			);
		} catch (error) {
			console.error('Error deleting board.');
			return false;
		}
	},
	getBoard: async (id) => {
		set({ isLoadingBoard: true, board: null, lists: [] });
		try {
			const response = await axios.get(`/api/boards/${id}`);
			const { lists, ...board } = response.data;
			set({ isLoadingBoard: false, board, lists });
		} catch (error) {
			console.error('Error fetching board.');
			set({ isLoadingBoard: false });
		}
	},
	addList: async (name, boardId) => {
		try {
			const response = await axios.post(`/api/boards/${boardId}/lists`, {
				name,
			});
			const list = response.data;
			set(
				produce((draft) => {
					draft.lists.push({ ...list, cards: [] });
				})
			);
		} catch (error) {
			console.error('Error adding list.');
		}
	},
	updateList: async (id, updates, boardId) => {
		try {
			await axios.patch(`/api/boards/${boardId}/lists/${id}`, updates);
			set(
				produce((draft) => {
					const list = draft.lists.find((list) => list.id === id);
					if (!list) {
						return;
					}
					Object.assign(list, updates);
				})
			);
		} catch (error) {
			console.error('Error updating list:', error.message);
		}
	},
	deleteList: async (id, boardId) => {
		try {
			await axios.delete(`/api/boards/${boardId}/lists/${id}`);
			set(
				produce((draft) => {
					draft.lists = draft.lists.filter((list) => list.id !== id);
				})
			);
		} catch (error) {
			console.error('Error deleting list.');
			return false;
		}
	},
	addCard: async (title, index, listId, boardId) => {
		try {
			const response = await axios.post(`/api/boards/${boardId}/cards`, {
				title,
				index,
				listId,
			});
			const card = response.data;
			set(
				produce((draft) => {
					const list = draft.lists.find(({ id }) => id === listId);
					list.cards.push(card);
				})
			);
		} catch (error) {
			console.error('Error adding card.');
		}
	},
	updateCard: async (id, updates, boardId, listId, isActiveCard = false) => {
		try {
			await axios.patch(`/api/boards/${boardId}/cards/${id}`, updates);
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
	deleteCard: async (id, boardId, listId) => {
		try {
			await axios.delete(`/api/boards/${boardId}/cards/${id}`);
			set(
				produce((draft) => {
					const list = draft.lists.find((list) => list.id === listId);
					list.cards = list.cards.filter((card) => card.id !== id);
				})
			);
		} catch (error) {
			console.error('Error deleting card.');
		}
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
	saveCards: async (boardId) => {
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

		try {
			const { dirtyCards } = get();
			const dirtyCardsArray = Object.values(dirtyCards);
			await axios.patch(`/api/boards/${boardId}/cards`, dirtyCardsArray);
			set({ dirtyLists: [], dirtyCards: {} });
		} catch (error) {
			console.error('Error saving cards.');
		}
	},
	addComment: async (text, cardId, boardId) => {
		try {
			const response = await axios.post(
				`/api/boards/${boardId}/cards/${cardId}/comments`,
				{
					text,
				}
			);
			const comment = response.data;
			set(
				produce((draft) => {
					draft.activeCard.comments = [
						comment,
						...draft.activeCard.comments,
					];
				})
			);
		} catch (error) {
			console.error('Error adding card.');
		}
	},
	deleteComment: async (id, cardId, boardId) => {
		try {
			await axios.delete(
				`/api/boards/${boardId}/cards/${cardId}/comments/${id}`
			);
			set(
				produce((draft) => {
					draft.activeCard.comments =
						draft.activeCard.comments.filter(
							(comment) => comment.id !== id
						);
				})
			);
		} catch (error) {
			console.error('Error deleting comment.');
		}
	},
}));

export default useBoardStore;
