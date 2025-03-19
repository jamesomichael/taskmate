const createBoard = async (name, background, userId, supabase) => {
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

const getBoards = async (userId, supabase) => {
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

const getBoardById = async (id, userId, supabase) => {
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

const updateBoard = async (id, updates, supabase) => {
	const { error } = await supabase
		.from('boards')
		.update(updates)
		.eq('id', id);

	if (error) {
		console.error('Error updating board:', error.message);
		return null;
	}

	return true;
};

const deleteBoard = async (id, supabase) => {
	const { error } = await supabase.from('boards').delete().eq('id', id);

	if (error) {
		console.error('Error deleting board:', error.message);
		return null;
	}

	return true;
};

const getLists = async (boardId, userId, supabase) => {
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

const createList = async (name, boardId, position, userId, supabase) => {
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

const updateList = async (id, updates, supabase) => {
	const { error } = await supabase.from('lists').update(updates).eq('id', id);

	if (error) {
		console.error('Error updating list:', error.message);
		return null;
	}

	return true;
};

const deleteList = async (id, supabase) => {
	const { error } = await supabase.from('lists').delete().eq('id', id);

	if (error) {
		console.error('Error deleting list:', error.message);
		return null;
	}

	return true;
};

const getCards = async (boardId, userId, supabase) => {
	const { data, error } = await supabase
		.from('cards')
		.select('*')
		.eq('board_id', boardId)
		.eq('user_id', userId)
		.order('index', { ascending: true });

	if (error) {
		console.error('Error fetching cards:', error.message);
		return [];
	}

	return data;
};

const updateCard = async (id, updates, supabase) => {
	const { error } = await supabase.from('cards').update(updates).eq('id', id);

	if (error) {
		console.error('Error updating card:', error.message);
		return null;
	}

	return true;
};

const updateCards = async (cards, supabase) => {
	if (cards.length === 0) {
		return false;
	}
	const { data, error } = await supabase
		.from('cards')
		.upsert(cards, { onConflict: ['id'] });

	if (error) {
		console.error('Error updating cards:', error.message);
		return false;
	}

	return data;
};

const createCard = async (title, index, listId, boardId, userId, supabase) => {
	const { data, error } = await supabase
		.from('cards')
		.insert([
			{
				user_id: userId,
				title,
				index,
				list_id: listId,
				board_id: boardId,
			},
		])
		.select()
		.single();

	if (error) {
		console.error('Error creating card:', error);
		return null;
	}

	return data;
};

const deleteCard = async (id, supabase) => {
	const { error } = await supabase.from('cards').delete().eq('id', id);

	if (error) {
		console.error('Error deleting card:', error.message);
		return null;
	}

	return true;
};

const updateAccount = async (updates, supabase) => {
	const { error } = await supabase.auth.updateUser(updates);

	if (error) {
		console.error('Error updating account:', error.message);
		return null;
	}

	return true;
};

export {
	createBoard,
	getBoards,
	getBoardById,
	updateBoard,
	deleteBoard,
	getLists,
	createList,
	updateList,
	deleteList,
	getCards,
	updateCard,
	createCard,
	updateCards,
	deleteCard,
	updateAccount,
};
