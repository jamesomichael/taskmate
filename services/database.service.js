import { createClient } from '@/utils/supabase/client';

const createBoard = async (name, userId) => {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('boards')
		.insert([{ user_id: userId, name }])
		.select()
		.single();

	if (error) {
		console.error('Error creating board:', error);
		throw new Error('Cannot create board.');
	}

	return data;
};

const deleteBoard = async (id, supabase = createClient()) => {
	const { error } = await supabase.from('boards').delete().eq('id', id);

	if (error) {
		console.error('Error deleting board:', error);
		throw new Error('Cannot delete board.');
	}

	return true;
};

export { createBoard, deleteBoard };
