import { createClient } from '@/utils/supabase/client';

const createBoard = async (
	name,
	background,
	userId,
	supabase = createClient()
) => {
	const { data, error } = await supabase
		.from('boards')
		.insert([{ user_id: userId, name, background }])
		.select()
		.single();

	if (error) {
		console.error('Error creating board:', error);
		return null;
	}

	return data;
};

const getBoards = async (userId, supabase = createClient()) => {
	const { data, error } = await supabase
		.from('boards')
		.select('*')
		.eq('user_id', userId)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching boards:', error.message);
		return [];
	}

	return data;
};

const getBoardById = async (id, userId, supabase = createClient()) => {
	const { data, error } = await supabase
		.from('boards')
		.select('*')
		.eq('id', id)
		.eq('user_id', userId)
		.single();

	if (error) {
		console.error('Error fetching board:', error.message);
		return null;
	}

	return data;
};

const deleteBoard = async (id, supabase = createClient()) => {
	const { error } = await supabase.from('boards').delete().eq('id', id);

	if (error) {
		console.error('Error deleting board:', error.message);
		return null;
	}

	return true;
};

const getLists = async (boardId, userId, supabase = createClient()) => {
	const { data, error } = await supabase
		.from('lists')
		.select('*')
		.eq('board_id', boardId)
		.eq('user_id', userId)
		.order('created_at', { ascending: true });

	if (error) {
		console.error('Error fetching lists:', error.message);
		return [];
	}

	return data;
};

const createList = async (
	name,
	boardId,
	position,
	userId,
	supabase = createClient()
) => {
	const { data, error } = await supabase
		.from('lists')
		.insert([{ user_id: userId, name, board_id: boardId, position }])
		.select()
		.single();

	if (error) {
		console.error('Error creating list:', error);
		return null;
	}

	return data;
};

const getCards = async (boardId, userId, supabase = createClient()) => {
	const { data, error } = await supabase
		.from('cards')
		.select('*')
		.eq('board_id', boardId)
		.eq('user_id', userId)
		.order('created_at', { ascending: true });

	if (error) {
		console.error('Error fetching cards:', error.message);
		return [];
	}

	return data;
};

const createCard = async (
	title,
	listId,
	boardId,
	userId,
	supabase = createClient()
) => {
	const { data, error } = await supabase
		.from('cards')
		.insert([
			{ user_id: userId, title, list_id: listId, board_id: boardId },
		])
		.select()
		.single();

	if (error) {
		console.error('Error creating card:', error);
		return null;
	}

	return data;
};

export {
	createBoard,
	getBoards,
	getBoardById,
	deleteBoard,
	getLists,
	createList,
	getCards,
	createCard,
};
