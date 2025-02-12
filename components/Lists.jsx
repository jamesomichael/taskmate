import React, { useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { createList } from '@/services/database.service';

import List from '@/components/List';
import AddList from '@/components/AddList';

const Lists = ({ board, lists: initialLists }) => {
	const [lists, setLists] = useState(initialLists);

	const handleListCreation = async (name, boardId) => {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const data = await createList(name, boardId, null, user.id, supabase);
		setLists((prev) => [...prev, data]);
	};

	return (
		<div className="p-3 flex gap-3 w-full overflow-x-scroll">
			{lists.map((list) => (
				<List key={list.id} boardId={board.id} list={list} />
			))}
			<AddList boardId={board.id} onCreate={handleListCreation} />
		</div>
	);
};

export default Lists;
