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

export { createBoard, getBoards, getBoardById, deleteBoard };
