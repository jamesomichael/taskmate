import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';

import List from '@/components/List';
import AddList from '@/components/AddList';
import Card from './Card';

import useBoardStore from '@/stores/boardStore';

const Lists = () => {
	const { lists } = useBoardStore();
	const [activeId, setActiveId] = useState();

	const handleDragStart = (event) => {
		console.log('eventstart', event);
		const { active } = event;
		const { id } = active;
		setActiveId(id);
	};

	const handleDragOver = (event) => {
		console.log('event', event);
	};

	const handleDragEnd = (event) => {
		console.log('event', event);
	};

	return (
		<div className="p-3 flex gap-3 w-full overflow-x-scroll">
			<DndContext
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				{lists.map((list) => (
					<List key={list.id} list={list} />
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
			<AddList />
		</div>
	);
};

export default Lists;
