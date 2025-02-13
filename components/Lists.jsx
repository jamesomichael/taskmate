import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';

import { createClient } from '@/utils/supabase/client';

import { createList } from '@/services/database.service';

import List from '@/components/List';
import AddList from '@/components/AddList';
import Card from './Card';

const Lists = ({ board, lists: initialLists }) => {
	const [lists, setLists] = useState(initialLists);
	const [activeId, setActiveId] = useState();

	const handleListCreation = async (name, boardId) => {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const data = await createList(name, boardId, null, user.id, supabase);
		setLists((prev) => [...prev, data]);
	};

	const handleDragStart = (event) => {
		console.log('eventstart', event);
		const { active } = event;
		const { id } = active;
		setActiveId(id);
	};

	const handleDragEnd = (event) => {
		console.log('event', event);
	};

	return (
		<div className="p-3 flex gap-3 w-full overflow-x-scroll">
			<DndContext
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				{lists.map((list) => (
					<List key={list.id} boardId={board.id} list={list} />
				))}
				<DragOverlay>
					{activeId && (
						<Card
							card={{
								id: 'test-card-1',
								title: 'Test Card 1',
							}}
						/>
					)}
				</DragOverlay>
			</DndContext>
			<AddList boardId={board.id} onCreate={handleListCreation} />
		</div>
	);
};

export default Lists;
